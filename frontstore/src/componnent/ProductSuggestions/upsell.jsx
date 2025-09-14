import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./upsellandCrossSell.css";
import { motion, AnimatePresence } from "framer-motion";
import apiRequest from "../axios/axiosInstance";
import { FaWindowClose } from "react-icons/fa";
import { addToBasket } from "../../Redux/slices/basketSlice";
import { useDispatch } from "react-redux";

function Upsell({ productId, onClose }) {
  const [upsells, setUpsells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUpsellIndex, setCurrentUpsellIndex] = useState(0);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await apiRequest.get(`/products/${productId}/suggestions`);
        setUpsells(response.data.upsells);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [productId]);

  const handleNext = () => {
    if (currentUpsellIndex < upsells.length - 1) {
      setCurrentUpsellIndex(currentUpsellIndex + 1);
    } else {
      onClose(); 
    }
  };

  const handleBuy = () => {
    const selectedUpsell = upsells[currentUpsellIndex];
    console.log("Adding to basket:", selectedUpsell);
    dispatch(addToBasket(selectedUpsell)); 
    navigate("/checkout", { state: { product: selectedUpsell } });
    onClose(); 
  };

  if (loading) return <div>Chargement des suggestions...</div>;
  if (error) return <div>Error: {error}</div>;
  if (upsells.length === 0) return <p>Aucun upsell trouvé.</p>;

  const currentUpsell = upsells[currentUpsellIndex];

  return (
    <div style={{width:"30%"}} >
      <AnimatePresence mode="wait" >
        <motion.div
          key={currentUpsell._id}
          className="product-card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <button onClick={onClose} className="close-button" style={{marginLeft:"11rem",marginBottom:"10px"}}>
            <FaWindowClose />
          </button>
          <img src={currentUpsell.imageCover} alt={currentUpsell.title} />
          <h5>{currentUpsell.title}</h5>
          <p> <span style={{color:"#747678"}}>Price :</span> {currentUpsell.price} €</p>
          <p ><span style={{color:"#747678"}}  >priceAfterDiscount :</span> {currentUpsell.priceAfterDiscount}€ </p>
          <p><span style={{color:"#747678"}}>stockStatus : </span>{currentUpsell.stockStatus} </p>
          <p><span style={{color:"#747678"}}>description :</span> {currentUpsell.description} </p>
          <p> <span style={{ color: "#747678" }}>ratingsAverage :</span>{"⭐".repeat(currentUpsell.ratingsAverage)} </p>

          <div className="upsell-actions">
            <button onClick={handleBuy} className="buy-button" >
              buy
            </button>
            <button onClick={handleNext} className="next-button" style={{marginLeft:"1rem"}}>
              next
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Upsell;