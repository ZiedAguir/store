import { useContext } from "react";
import { BsCart4 } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // Importez useNavigate
import ButtonSearch from "./componentsProfile/buutonSearch";
import DropdownLanguage from "./componentsProfile/dropdownLanguage";
import Notification from "./componentsProfile/notification";
import ProfilInfo from "./componentsProfile/profilInfo";
import { FormContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../../Redux/slices/basketSlice";

function Header() {
  const { customizationSettings } = useContext(FormContext);
  const basket = useSelector(selectBasketItems); 
  const navigate = useNavigate(); 

  const handleCheckout = () => {
    const lastProduct = basket[basket.length - 1]; 
    navigate("/checkout", { state: { product: lastProduct } }); 
  };

  return (
    <header className="header" style={{ backgroundColor: customizationSettings.headerColor, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
        <a href="/" className="logo">
          <img src="img/astra2.png" style={{ width: '200px', height: '40px' }} alt="astra" />
        </a>
        <div
          className="d-md-none toggle-sidebar-left"
          data-toggle-class="sidebar-left-opened"
          data-target="html"
          data-fire-event="sidebar-left-opened"
        >
          <i className="fas fa-bars" aria-label="Toggle sidebar" />
        </div>
      </div>

      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'nowrap' }}>
        <DropdownLanguage/>
        <span className="separator" />

        <ButtonSearch/>
        <span className="separator" />

        <Notification/>
        
        <span className="separator" />
        {/* basket */}
        <button onClick={handleCheckout} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <span className="badge" style={{margin:"5px",color:"white" ,backgroundColor:"#e74c3c", borderRadius:"20rem"}}>{basket.length}</span>
          <BsCart4 className="cart-icon" size={30} style={{ marginRight: '15px', color: "black" }} />
        </button>
        
        <span className="separator" />

        <ProfilInfo/>
        
      </div>
    </header>
  );
}

export default Header;





