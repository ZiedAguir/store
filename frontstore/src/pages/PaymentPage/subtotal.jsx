import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectBasketItems, selectBasketTotal } from "../../Redux/slices/basketSlice";
import { NumericFormat as NumberFormat } from "react-number-format";
import "./subtotal.css";
import { moveProductToCart } from "../../Redux/Action/basketAction";

function Subtotal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basket = useSelector(selectBasketItems); 
  const total = useSelector(selectBasketTotal); 

  // Fonction pour déplacer tous les articles du panier vers le panier d'achat
  const handleMoveToCart = () => {
    if (basket.length === 0) {
      alert("Your basket is empty.");
      return;
    }
    basket.forEach((product) => {
      dispatch(moveProductToCart(product));
    });
    navigate("/cart");
  };
  return (
    <div className="subtotal">
      <NumberFormat
        value={total}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        decimalScale={2}
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
      />
      <button onClick={handleMoveToCart}>Move to Cart</button>
    </div>
  );
}

export default Subtotal;