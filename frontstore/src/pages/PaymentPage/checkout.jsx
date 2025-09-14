import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "./chekout.css";
import Upsell from "../../componnent/ProductSuggestions/upsell";
import CrossSell from '../../componnent/ProductSuggestions/crossSell';
import Header from '../../componnent/Header/headerprofil';
import { FormContext } from '../../componnent/context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectBasketItems } from '../../Redux/slices/basketSlice'; 
import Subtotal from './subtotal';
import apiRequest from '../../componnent/axios/axiosInstance';
import { emptyBasket } from '../../Redux/slices/basketSlice';

function Checkout() {
  const { currentUser } = useContext(FormContext) || {};
  const email = currentUser?.data?.email || '';
  const profileImg = currentUser?.data?.profileImg || '';

  const location = useLocation();
  const navigate = useNavigate();
  // Récupère le produit passé depuis Upsell ou CardPrincipal
  const product = location.state?.product; 
  const [showUpsell, setShowUpsell] = useState(false);
  const [showCrosSell, setShowCrosSell] = useState(false);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const basket = useSelector(selectBasketItems);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const upsellTimer = setTimeout(() => {
      setShowUpsell(true);
    }, 3000);

    const crossSellTimer = setTimeout(() => {
      setShowCrosSell(true);
    }, 6000);

    return () => {
      clearTimeout(upsellTimer);
      clearTimeout(crossSellTimer);
    };
  }, []);

  const handleCloseUpsell = () => {
    setShowUpsell(false);
  };

  const handleCloseCrossSell = () => {
    setShowCrosSell(false);
  };
  const removeFromBasket = (uniqueId) => {
    return {
      type: "basket/removeFromBasket",
      payload: uniqueId,
    };
  };
  const handleAddOrder = async () => {
    try {
      setCreatingOrder(true);
      setOrderError(null);
      if (!basket || basket.length === 0) {
        alert('Your basket is empty.');
        return;
      }

      // Sync basket items to backend cart
      for (const item of basket) {
        await apiRequest.post('/cart', {
          productId: item._id,
          color: item.color || 'default'
        });
      }

      // Get user's cart to retrieve cartId
      const { data: cartRes } = await apiRequest.get('/cart');
      const cartId = cartRes?.data?._id;
      if (!cartId) {
        throw new Error('Cart not found for current user');
      }

      // Create cash order
      const shippingAddress = {
        details: 'N/A',
        phone: '0000000000',
        city: 'N/A',
        postalCode: '0000'
      };
      await apiRequest.post(`/orders/${cartId}`, { shippingAddress });

      // Clear basket and go to OrderList
      dispatch(emptyBasket());
      navigate('/OrderList');
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Failed to create order';
      setOrderError(message);
      alert(message);
    } finally {
      setCreatingOrder(false);
    }
  };
  return (
    <>
      <Header />
      <div className="checkout-container">
      
      <div className="checkout-product-details">
      <div className="checkout-back-wrapper">
        <button className="checkout-back" onClick={() => navigate(-1)} title="Retour">
          <i className="fas fa-arrow-left" />
        </button>
      </div>
        <img className="checkout-ad" src={profileImg || "img/avatar.jpg"} alt='img' />
        <h3>Hello, <div style={{ color: "#f6bc2a" }}>{email}</div></h3>
        <h2 style={{ color: "#424344" }}>Your shopping Basket:</h2>

        {basket.length > 0 ? (
          
          <>
            {basket.map((item) => (
              <div key={item._id} className="checkout-item">
                <img src={item.imageCover} alt={item.title} className="checkout-product-image" />
                <h3>{item.title}</h3>
                <p>stockStatus  : {item.price}</p>
                <p>price : {item.price}</p>
                <p>priceAfterDiscount : {item.priceAfterDiscount}</p>
                <p>rating : {"⭐".repeat(item.ratingsAverage)}</p>
                <button onClick={() => dispatch(removeFromBasket(item.uniqueId))}>Remove from basket</button>
                </div>
            ))}
          </>
        ) : (
          <p>Aucun produit sélectionné.</p>
        )}

        {/* Suggestions inside the list area, stacked one by one */}
        <div className="checkout-suggestions">
          {showUpsell && product && (
            <div className="upSell">
              <Upsell productId={product._id} onClose={handleCloseUpsell} />
            </div>
          )}
          {showCrosSell && product && (
            <div className="CrosSell">
              <CrossSell productId={product._id} onClose={handleCloseCrossSell} />
            </div>
          )}
        </div>

      </div>
      <div ></div>
      <Subtotal className='subtotal'/>
      <div style={{ marginTop: 12 }}>
        <button onClick={handleAddOrder} disabled={creatingOrder} className="add-order-btn">
          {creatingOrder ? 'Creating order...' : 'Add order'}
        </button>
        {orderError && (
          <p style={{ color: 'red', marginTop: 8 }}>{orderError}</p>
        )}
      </div>
      </div>
    </>
  );
}

export default Checkout;
