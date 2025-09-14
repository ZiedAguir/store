import { useEffect, useState } from "react";
import apiRequest from "../axios/axiosInstance";
import "./upsellandCrossSell.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../Redux/slices/basketSlice";
import { useNavigate } from "react-router-dom";

function CrossSell({ productId, onClose }) {
  const [crossSells, setCrossSells] = useState([]);
  const [currentCrossSellsIndex, setCurrentCrossSellsIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await apiRequest.get(`/products/${productId}/suggestions`);
        setCrossSells(response.data.crossSells);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSuggestions();
  }, [productId]);

  const handleNext = () => {
    if (currentCrossSellsIndex < crossSells.length - 1) {
      setCurrentCrossSellsIndex(currentCrossSellsIndex + 1);
    } else {
      onClose();
    }
  };

 
   const handleBuy = () => {
      const selectedCrossSell = crossSells[currentCrossSellsIndex];
      console.log("Adding to basket:", selectedCrossSell);
      dispatch(addToBasket(selectedCrossSell)); 
      navigate("/checkout", { state: { product: selectedCrossSell } });
      onClose(); 
    };

  if (crossSells.length === 0) return <p>Aucun cross-sell trouvé.</p>;

  const currentCrosSell = crossSells[currentCrossSellsIndex];

  return (
    <div style={{ width: "30%" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCrosSell._id}
          className="product-card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <button onClick={onClose} className="close-button" style={{ marginLeft: "11rem", marginBottom: "10px" }}>
            <FaWindowClose />
          </button>
          <img src={currentCrosSell.imageCover} alt={currentCrosSell.title} />
          <h5>{currentCrosSell.title}</h5>
          <p> <span style={{ color: "#747678" }}>Price :</span> {currentCrosSell.price} €</p>
          <p> <span style={{ color: "#747678" }}>priceAfterDiscount :</span> {currentCrosSell.priceAfterDiscount} €</p>

          <p><span style={{ color: "#747678" }}>stockStatus : </span>{currentCrosSell.stockStatus} </p>
          <p><span style={{ color: "#747678" }}>description :</span> {currentCrosSell.description} </p>
          <p> <span style={{ color: "#747678" }}>ratingsAverage :</span>{"⭐".repeat(currentCrosSell.ratingsAverage)} </p>

          <div className="upsell-actions">
            <button onClick={handleBuy} className="buy-button">
              buy
            </button>
            <button onClick={handleNext} className="next-button" style={{ marginLeft: "1rem" }}>
              next
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default CrossSell;