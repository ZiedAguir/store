import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiRequest from "../../componnent/axios/axiosInstance";

function InvoicePrint() {
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);

  useEffect(() => {
    const loadLatestInvoice = async () => {
      if (order) return;
      try {
        const { data } = await apiRequest.get('/orders?isInvoiced=true&sort=-invoicedAt&limit=1');
        const list = Array.isArray(data?.data) ? data.data : data?.data?.data || [];
        if (list.length > 0) setOrder(list[0]);
      } catch (e) {
        // Silent fail keeps static fallback
      }
    };
    loadLatestInvoice();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const items = Array.isArray(order?.cartItems) ? order.cartItems : [];
  const subTotal = items.reduce((acc, it) => acc + Number(it?.price || 0) * Number(it?.quantity || 0), 0);
  const total = Number(order?.totalOrderPrice ?? subTotal);

  return (

<div className="invoice">
  <header className="clearfix">
    <div className="row">
      <div className="col-sm-6 mt-3">
        <h2 className="h2 mt-0 mb-1 text-dark font-weight-bold">INVOICE</h2>
        <h4 className="h4 m-0 text-dark font-weight-bold">#{String(order?._id || '').slice(-6).toUpperCase()}</h4>
      </div>
      <div className="col-sm-6 text-end mt-3 mb-3">
                  <address className="ib me-5">
                    {order?.user?.name || order?.user?.email || 'Customer'}
                    <br />
                    {order?.shippingAddress?.details || ''}
                    <br />
                    Phone: {order?.shippingAddress?.phone || ''}
                    <br />
                    {order?.user?.email || ''}
                  </address>
                  <div className="ib">
                  <img src="img/astra2.png"   style={{width:'150px',height:'60px'}} alt="astra"/>
                  </div>
                </div>
    </div>
  </header>
  <div className="bill-info">
    <div className="row">
      <div className="col-md-6">
        <div className="bill-to">
          <p className="h5 mb-1 text-dark font-weight-semibold">To:</p>
          <address>
                      {order?.user?.name || order?.user?.email || 'Customer'}
                      <br />
                      {order?.shippingAddress?.details || ''}
                      <br />
                      Phone: {order?.shippingAddress?.phone || ''}
                      <br />
                      {order?.user?.email || ''}
                    </address>
        </div>
      </div>
      <div className="col-md-6">
        <div className="bill-data text-end">
          <p className="mb-0">
            <span className="text-dark">Invoice Date:</span>
            <span className="value">{order?.invoicedAt ? new Date(order.invoicedAt).toLocaleDateString() : (order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : '')}</span>
          </p>
          <p className="mb-0">
            <span className="text-dark">Due Date:</span>
            <span className="value">{order?.invoicedAt ? new Date(order.invoicedAt).toLocaleDateString() : ''}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <table className="table table-responsive-md invoice-items">
    <thead>
      <tr className="text-dark">
        <th id="cell-id" className="font-weight-semibold">#</th>
        <th id="cell-item" className="font-weight-semibold">Item</th>
        <th id="cell-price" className="text-center font-weight-semibold">Price</th>
        <th id="cell-qty" className="text-center font-weight-semibold">Quantity</th>
        <th id="cell-total" className="text-center font-weight-semibold">Total</th>
      </tr>
    </thead>
    <tbody>
                {items.length > 0 ? (
                  items.map((it, idx) => (
                    <tr key={idx}>
                      <td>{String(it?.product?._id || '').slice(-6).toUpperCase()}</td>
                      <td className="font-weight-semibold text-dark">{it?.product?.title || 'Product'}</td>
                      <td className="text-center">${Number(it?.price || 0).toFixed(2)}</td>
                      <td className="text-center">{Number(it?.quantity || 0)}</td>
                      <td className="text-center">${Number((it?.price || 0) * (it?.quantity || 0)).toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5}>No items.</td></tr>
                )}
              </tbody>
  </table>
  <div className="invoice-summary">
    <div className="row justify-content-end">
      <div className="col-sm-4">
        <table className="table h6 text-dark">
          <tbody>
            <tr className="b-top-0">
              <td colSpan={2}>Subtotal</td>
              <td className="text-start">${subTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan={2}>Shipping</td>
              <td className="text-start">$0.00</td>
            </tr>
            <tr className="h4">
              <td colSpan={2}>Grand Total</td>
              <td className="text-start">${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div className="d-grid gap-3 d-md-flex justify-content-md-end me-4">
            <button onClick={handlePrint} className="btn btn-primary ms-3"><i className="fas fa-print" /> Print now</button>
 </div>
</div>


    

    );
}
  
export default InvoicePrint;