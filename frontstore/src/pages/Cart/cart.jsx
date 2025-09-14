import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { NumericFormat as NumberFormat } from "react-number-format";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import { clearCart, selectCartItems, selectCartTotal } from "../../Redux/slices/cartSlice";
import apiRequest from "../../componnent/axios/axiosInstance";
import { removeItemFromCart } from "../../Redux/Action/cartActions";

function Cart() {
  const cart = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // État pour le paiement Stripe
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (cart.length > 0) {
      const getClientSecret = async () => {
        try {
          const response = await apiRequest.post("/payments/create", {
            total: Math.round(total * 100) 
          });
          setClientSecret(response.data.clientSecret);
        } catch (err) {
          console.error("Error creating payment intent:", err);
        }
      };
      getClientSecret();
    }
  }, [cart, total]);

  const handleRemoveItem = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    if (!stripe || !elements) {
      return;
    }

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (paymentIntent.status === "succeeded") {
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        
        dispatch(clearCart());
        navigate("/orders");
      }
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.uniqueId} className="cart__item">
                <img src={item.imageCover} alt={item.title} />
                <div className="cart__itemInfo">
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => handleRemoveItem(item.uniqueId)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="payment-section">
  <h3>Payment Details</h3>
  <div className="payment-details">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement 
          id="card-element"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#e74c3c',
              },
            },
          }}
          onChange={handleChange}
        />
      </div>
      
      <div className="cart__total">
        <NumberFormat
          value={total}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          decimalScale={2}
          renderText={(value) => <h3>Order Total: {value}</h3>}
        />
        
        <button
          type="submit"
          disabled={processing || disabled || succeeded}
          className="pay-button"
        >
          {processing ? (
            <>
              <span className="spinner"></span> Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </button>
      </div>
      
      {error && (
        <div className="payment-error">
          <i className="icon-error"></i> {error}
        </div>
      )}
      
      {succeeded && (
        <div className="payment-success">
          <i className="icon-success"></i> Payment successful! Redirecting...
        </div>
      )}
    </form>
  </div>
</div>
        </>
      )}
    </div>
  );
}

export default Cart;