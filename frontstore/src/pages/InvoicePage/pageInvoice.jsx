import Header from "../../componnent/Header/headerprofil";
import SideBar from "../../componnent/SideBare/sideBare";
import { useLocation } from "react-router-dom";
import apiRequest from "../../componnent/axios/axiosInstance";

function InvoicePage() {
  const location = useLocation();
  const order = location.state?.order;
  return (
    <section className="body">
      <Header />

      <div className="inner-wrapper">
        {/* start: sidebar */}
        <aside id="sidebar-left" className="sidebar-left">
          <div className="sidebar-header">
            <SideBar />
          </div>
        </aside>
        {/* end: sidebar */}

        <section role="main" className="content-body ">
          <header className="page-header">
           
            <h2>Invoice</h2>
            <div className="right-wrapper text-end">
            
              <ol className="breadcrumbs">
                <li>
                  <a href="/homepage">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li>
                  <span>Pages</span>
                </li>
                <li>
                  <span>Invoice</span>
                </li>
              </ol>
              <button className="checkout-back btn btn-light btn-sm me-2" onClick={() => window.history.back()} title="Retour">
              <i className="fas fa-arrow-left" />
            </button>
            </div>
            
          </header>
          {/* start: page */}
          <section className="card">
            <div className="card-body">
              <div className="invoice">
                <header className="clearfix">
                  <div className="row">
                    <div className="col-sm-6 mt-3">
                      <h2 className="h2 mt-0 mb-1 text-dark font-weight-bold">
                        INVOICE
                      </h2>
                      <h4 className="h4 m-0 text-dark font-weight-bold">
                        #76598345
                      </h4>
                    </div>
                    <div className="col-sm-6 text-end mt-3 mb-3">
                      <address className="ib me-5">
                        Aguir Zied
                        <br />
                        123 Astra Street, Tunisia, Monastir
                        <br />
                        Phone: +216 90427798
                        <br />
                        zieguir99@gmail.com
                      </address>
                      <div className="ib">
                        <img
                          src="img/astra2.png"
                          style={{ width: "150px", height: "60px" }}
                          alt="astra"
                        />
                      </div>
                    </div>
                  </div>
                </header>
                <div className="bill-info">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="bill-to">
                        <p className="h5 mb-1 text-dark font-weight-semibold">
                          To:
                        </p>
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
                          <span className="value">{order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}</span>
                        </p>
                        <p className="mb-0">
                          <span className="text-dark">Due Date:</span>
                          <span className="value">06/20/2023</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <table className="table table-responsive-md invoice-items">
                  <thead>
                    <tr className="text-dark">
                      <th id="cell-id" className="font-weight-semibold">
                        #
                      </th>
                      <th id="cell-item" className="font-weight-semibold">
                        Item
                      </th>
                      <th id="cell-desc" className="font-weight-semibold">
                        Description
                      </th>
                      <th
                        id="cell-price"
                        className="text-center font-weight-semibold"
                      >
                        Price
                      </th>
                      <th
                        id="cell-qty"
                        className="text-center font-weight-semibold"
                      >
                        Quantity
                      </th>
                      <th
                        id="cell-total"
                        className="text-center font-weight-semibold"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(order?.cartItems) && order.cartItems.length > 0 ? (
                      order.cartItems.map((item, idx) => (
                        <tr key={idx}>
                          <td>{String(item?.product?._id || '').slice(-6).toUpperCase()}</td>
                          <td className="font-weight-semibold text-dark">{item?.product?.title || 'Product'}</td>
                          <td>{item?.product?.stockStatus || ''}</td>
                          <td className="text-center">${Number(item?.price || 0).toFixed(2)}</td>
                          <td className="text-center">{Number(item?.quantity || 0)}</td>
                          <td className="text-center">${Number((item?.price || 0) * (item?.quantity || 0)).toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={6}>No items.</td></tr>
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
                            <td className="text-start">
                              ${(() => {
                                const items = Array.isArray(order?.cartItems) ? order.cartItems : [];
                                const sub = items.reduce((acc, it) => acc + Number(it?.price || 0) * Number(it?.quantity || 0), 0);
                                return sub.toFixed(2);
                              })()}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Shipping</td>
                            <td className="text-start">$0.00</td>
                          </tr>
                          <tr className="h4">
                            <td colSpan={2}>Grand Total</td>
                            <td className="text-start">${Number(order?.totalOrderPrice || 0).toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-grid gap-3 d-md-flex justify-content-md-end me-4">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={async () => {
                    try {
                      if (!order?._id) return;
                      await apiRequest.put(`/orders/${order._id}/invoice`, {});
                      alert('Invoice saved successfully');
                    } catch (e) {
                      const msg = e?.response?.data?.message || e.message || 'Failed to save invoice';
                      alert(msg);
                    }
                  }}
                >
                  Submit Invoice
                </button>
                <a
                  href="/InvoicePrint"
                  target="_blank"
                  className="btn btn-primary ms-3"
                >
                  <i className="fas fa-print" /> Print here
                </a>
              </div>
            </div>
          </section>
          {/* end: page */}
        </section>
      </div>
    </section>
  );
}

export default InvoicePage;
