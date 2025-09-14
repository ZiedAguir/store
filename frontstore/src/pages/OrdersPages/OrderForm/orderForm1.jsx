import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./orderform.css"; // Import custom CSS for styling and animations
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function OrderForm1() {
  const location = useLocation();
  const order = location.state?.order;
  const [startDate, setStartDate] = useState(order?.createdAt ? new Date(order.createdAt) : new Date());
  const navigate = useNavigate();

  return (
    <section role="main" className="content-body content-body-modern mt-0">
      <header className="page-header page-header-left-inline-breadcrumb">
        <h2 className="font-weight-bold text-6 animate-fade-in">Order #{String(order?._id || '').slice(-6).toUpperCase()} Details</h2>
        <div className="right-wrapper animate-slide-in">
          <ol className="breadcrumbs">
            <li><span>Home</span></li>
            <li><span>eCommerce</span></li>
            <li><span>Orders</span></li>
          </ol>
        </div>
        <div className="d-flex align-items-center justify-content-between px-3 mt-2">
          <button className="checkout-back btn btn-light btn-sm" onClick={() => window.history.back()} title="Retour">
            <i className="fas fa-arrow-left" />
          </button>
          </div> 
      </header>
      
      <form className="order-details action-buttons-fixed animate-zoom-in" method="post">
        <div className="row">
          <div className="col-xl-4 mb-4 mb-xl-0">
            <div className="card card-modern animate-slide-in">
              <div className="card-header"><h2 className="card-title">General</h2></div>
              <div>
 
  <div className="card-body">
    <div className="form-row">
      <div className="form-group col mb-3">
        <label>Status</label>
        <select className="form-control form-control-modern" name="orderStatus" required defaultValue={order?.adminStatus || (order?.isDelivered ? 'completed' : 'on-hold')}>
          <option value="on-hold">On Hold</option>
          <option value="processing">waiting</option>
          <option value="completed">Completed</option>
          <option value="cancelled">out of stock</option>
        </select>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group col mb-3">
        <label>Date Created</label>
        <div className="date-time-field">
        <div className="date">
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="Pp"
                            className="form-control form-control-modern"
                          />
                        </div>
          
        </div>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group col mb-3">
        <label>Customer</label>
        <input className="form-control form-control-modern" name="orderCustomer" readOnly value={order?.user?.name || order?.user?.email || ''} />
      </div>
    </div>
  </div>
</div>

            </div>
          </div>
          
         <div className="col-xl-8">
  <div className="card card-modern">
    <div className="card-header">
      <h2 className="card-title">Addresses</h2>
    </div>
    <div className="card-body">
      <div className="row">
        <div className="col-xl-auto me-xl-5 pe-xl-5 mb-4 mb-xl-0">
          <h3 className="text-color-dark font-weight-bold text-4 line-height-1 mt-0 mb-3">BILLING</h3>
          <ul className="list list-unstyled list-item-bottom-space-0">
            <li>Rue carthage</li>
            <li>5011</li>
            <li>Khnis</li>
            <li>monastir</li>
            
            <li>Tunis</li>
          </ul>
          <strong className="d-block text-color-dark">Email address:</strong>
          <a href="mailto:johndoe@domain.com">zieguir99@gmail.com</a>
          <strong className="d-block text-color-dark mt-3">Phone:</strong>
          <a href="tel:+90427798" className="text-color-dark">90427798</a>
        </div>
        <div className="col-xl-auto ps-xl-5">
          <h3 className="font-weight-bold text-color-dark text-4 line-height-1 mt-0 mb-3">SHIPPING</h3>
          <ul className="list list-unstyled list-item-bottom-space-0">
            <li>{order?.shippingAddress?.details || ''}</li>
            <li>{order?.shippingAddress?.city || ''}</li>
            <li>{order?.shippingAddress?.postalCode || ''}</li>
          </ul>
          <strong className="d-block text-color-dark">Email address:</strong>
          <a href={`mailto:${order?.user?.email || ''}`}>{order?.user?.email || ''}</a>
          <strong className="d-block text-color-dark mt-3">Phone:</strong>
          <a href={`tel:${order?.shippingAddress?.phone || ''}`} className="text-color-dark">{order?.shippingAddress?.phone || ''}</a>
        </div>
        
      </div>
      
    </div>
    
  </div>
  
</div>

        </div>

        <div className="row " style={{paddingLeft:"25rem",paddingRight:"25rem"}}>
          <button type="button" className="submit-button btn btn-primary animate-bounce" onClick={() => navigate('/InvoicePage', { state: { order } })} >Save Order</button>
          <button className="cancel-button btn btn-light animate-fade-in">Cancel</button>
          <button className="delete-button btn btn-danger animate-shake">Delete Order</button>
        </div>
      </form>
      
    </section>
  );
}

export default OrderForm1;
