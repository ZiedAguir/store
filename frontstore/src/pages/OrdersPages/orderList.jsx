import Header from "../../componnent/Header/headerprofil";
import SideBar from "../../componnent/SideBare/sideBare";
import OrderList1 from "./OrderList/orderList";
import { useNavigate } from "react-router-dom";

function OrderList() {
  const navigate = useNavigate();
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
       <div className="content-body p-3">
        
         <OrderList1/>
       </div>
      </div>
    </section>
  );
}

export default OrderList;
