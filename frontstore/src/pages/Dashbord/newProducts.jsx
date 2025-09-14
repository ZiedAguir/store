import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingProducts, approveProduct, rejectProduct } from "../../Redux/Action/productActions";
import { FormContext } from "../../componnent/context/AuthContext";
import "./newProducts.css";

function NewProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useContext(FormContext);
  const { pendingProducts: pendingRaw, isFetching } = useSelector((state) => state.product || {});
  const pendingProducts = Array.isArray(pendingRaw) ? pendingRaw : [];
  const [rejectReasons, setRejectReasons] = useState({});
  const [approving, setApproving] = useState({});
  const [rejecting, setRejecting] = useState({});
  const [errorsById, setErrorsById] = useState({});
  const [successById, setSuccessById] = useState({});

  useEffect(() => {
    dispatch(fetchPendingProducts());
  }, [dispatch]);

  const handleApprove = async (id) => {
    try {
      setErrorsById((p) => ({ ...p, [id]: null }));
      setApproving((p) => ({ ...p, [id]: true }));
      await dispatch(approveProduct(id));
      setSuccessById((p) => ({ ...p, [id]: "Approved" }));
      await dispatch(fetchPendingProducts());
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Approval failed";
      setErrorsById((p) => ({ ...p, [id]: msg }));
    }
    setApproving((p) => ({ ...p, [id]: false }));
  };

  const handleReject = async (id) => {
    const reason = rejectReasons[id] || "";
    if (!reason || reason.trim().length < 4) return;
    try {
      setErrorsById((p) => ({ ...p, [id]: null }));
      setRejecting((p) => ({ ...p, [id]: true }));
      await dispatch(rejectProduct(id, reason));
      setSuccessById((p) => ({ ...p, [id]: "Rejected" }));
      await dispatch(fetchPendingProducts());
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Rejection failed";
      setErrorsById((p) => ({ ...p, [id]: msg }));
    }
    setRejecting((p) => ({ ...p, [id]: false }));
  };

  const handleChangeReason = (id, value) => {
    setRejectReasons((prev) => ({ ...prev, [id]: value }));
  };

  if (!currentUser || !["admin", "superadmin"].includes(currentUser?.data?.role)) {
    return <div>Access denied.</div>;
  }

  return (
    <section role="main" className="container-fluid content-body content-body-modern mt-0 new-products-admin">
      <div className="npa-header d-flex justify-content-between align-items-center">
        <h3 className="npa-title">New Products</h3>
        <button className="btn btn-outline-primary" onClick={() => navigate('/ListProducts')}>Return</button>
      </div>
      {isFetching && <div className="npa-state">Loading...</div>}
      {!isFetching && pendingProducts.length === 0 && <div className="npa-state">No pending products.</div>}
      <div className="row row-gutter-sm">
        {pendingProducts.map((product) => (
          <div className="col-sm-6 col-xl-3" key={product._id}>
            <div className="card card-modern card-modern-alt-padding npa-card">
              <div className="card-body bg-light">
                <div className="image-frame mb-2">
                  <div className="image-frame-wrapper">
                    <img style={{ borderRadius: "10px" }} src={product.imageCover} className="img-fluid" alt="img" />
                  </div>
                </div>
                <h4 className="text-4 line-height-2 mt-0 mb-2 npa-title-clamp">{product.title}</h4>
                <div className="product-price mb-2">
                  <div className="regular-price on-sale">${product.priceAfterDiscount || product.price}</div>
                  {product.priceAfterDiscount && <div className="sale-price">${product.price}</div>}
                </div>
                <div className="product-description-wrapper">
                  <div className="description-clamp">{product.description}</div>
                </div>
                <small className="text-muted d-block mt-2">Submitted by: {product?.creator?.name || "Unknown"}</small>
                <div className="card-footer border mt-3 p-2 npa-footer">
                  <div className="d-flex gap-2 mb-2">
                    <button className="btn btn-sm btn-success flex-fill" disabled={!!approving[product._id]} onClick={() => handleApprove(product._id)}>
                      {approving[product._id] ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                          Approving
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check me-1" /> Approve
                        </>
                      )}
                    </button>
                    <button className="btn btn-sm btn-danger flex-fill" disabled={!!rejecting[product._id]} onClick={() => handleReject(product._id)}>
                      {rejecting[product._id] ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                          Rejecting
                        </>
                      ) : (
                        <>
                          <i className="fas fa-times me-1" /> Reject
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    className="form-control form-control-sm npa-reason-input"
                    placeholder="Rejection reason (required to reject)"
                    rows={2}
                    value={rejectReasons[product._id] || ""}
                    onChange={(e) => handleChangeReason(product._id, e.target.value)}
                  />
                  {errorsById[product._id] && (
                    <div className="text-danger small mt-2 npa-error">{errorsById[product._id]}</div>
                  )}
                  {/* Remove success chip to avoid confusing stale cards; list refresh removes them */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewProducts;
