import Header from "../../componnent/Header/headerprofil";
import SideBar from "../../componnent/SideBare/sideBare";
import OrderForm1 from "./OrderForm/orderForm1";

function OrderForm() {
  return (
    <section className="body">
      {/* start: header */}
      <Header />
      
      {/* end: header */}
      <div className="inner-wrapper">
        {/* start: sidebar */}
        <aside id="sidebar-left" className="sidebar-left">
          <div className="sidebar-header">
            <SideBar />
          </div>
        </aside>
        {/* end: sidebar */}
        
        <OrderForm1 />
        
      </div>
    </section>
  );
}

export default OrderForm;
