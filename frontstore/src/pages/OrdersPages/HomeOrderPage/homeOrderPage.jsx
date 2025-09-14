import { useEffect, useState } from "react";
import Footer from "../../../componnent/Footer/footer";
import OrderForm1 from "../OrderForm/orderForm1";
import Header from "../../../componnent/Header/headerprofil";
import OrderList1 from "../OrderList/orderList";

function HomeOrderPage() {
  const [orderOptions, setOrderOptions] = useState({});

  useEffect(() => {
    // Retrieve selected options from localStorage (adjust key if needed)
    const step3Data = JSON.parse(localStorage.getItem("step3Data"));
    if (step3Data && step3Data.formSelections?.Orders) {
      const options = step3Data.formSelections.Orders.reduce((acc, item) => {
        acc[item] = true;
        return acc;
      }, {});
      setOrderOptions(options);
    }
  }, []);

  // Log orderOptions whenever it changes
  useEffect(() => {
  }, [orderOptions]);

  return (
    <div>
      {orderOptions.Header && <Header />}
      {orderOptions.orderform && <OrderForm1 />}
      {orderOptions.orderList && <OrderList1 />}
      {orderOptions.footer && <Footer />}
    </div>
  );
}

export default HomeOrderPage;

