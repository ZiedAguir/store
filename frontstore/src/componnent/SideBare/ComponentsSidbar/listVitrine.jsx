import { useContext, useState } from "react";
import { FormContext } from "../../context/AuthContext";

function ListVitrine2() {
    const {  customizationSettings } = useContext(FormContext);
     const selectedColor = customizationSettings.sidebarColor || "#000"; 
     const menuType = customizationSettings.menuType || "simple"; 
     const iconSize = menuType === "simple" ? "1rem" : "1.8rem";
     
    const [isPageOpen1, setPageOpen] = useState(false);
    const togglePageVitrine = () => {
        setPageOpen(!isPageOpen1);
      };
    return (
       <li className={`nav-parent ${isPageOpen1 ? 'nav-expanded nav-active' : ''}`}>
        <a className="nav-link" href="#" onClick={togglePageVitrine}>
          <i className="bx bx-cart-alt"style={{ color: selectedColor, fontSize: iconSize }} aria-hidden="true" />
          <span>Site_Vitrine</span>
        </a>
        {isPageOpen1 && (
          <ul className="nav nav-children">
          <li>
            <a className="nav-link" href="/homepage">
              Astra_Store
            </a>
          </li>
          <li>
            <a className="nav-link" href="/ListProducts">
              Products List
            </a>
          </li>
          <li>
            <a className="nav-link" href="/FormProducts">
              Products Form
            </a>
          </li>
          <li>
            <a className="nav-link" href="/ListCategories">
              Categories List
            </a>
          </li>
          <li>
            <a className="nav-link" href="/FormCategory">
              Category Form
            </a>
          </li>
          <li>
            <a className="nav-link" href="/CouponList">
              Coupons List
            </a>
          </li>
          <li>
            <a className="nav-link" href="/CouponForm">
              Coupons Form
            </a>
          </li>
          <li>
            <a className="nav-link" href="/OrderList">
              Orders List
            </a>
          </li>
          <li>
            <a className="nav-link" href="OrderForm">
              Orders Detail
            </a>
          </li>
          <li>
            <a className="nav-link" href="/CustomersList">
              Customers List
            </a>
          </li>
          <li>
            <a className="nav-link" href="/CustomersForm">
              Customers Form
            </a>
          </li>
        </ul>
        )}
      </li>
    );
  }
  
  export default ListVitrine2;