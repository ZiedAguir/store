import React, { useEffect, useContext, useState } from "react";
import "./myProductsStatus.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProducts, deleteProduct } from "../../Redux/Action/productActions";
import { FormContext } from "../../componnent/context/AuthContext";

function MyProductsStatus() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useContext(FormContext);
  const { myProducts: myRaw, isFetching } = useSelector((state) => state.product || {});
  const myProducts = Array.isArray(myRaw) ? myRaw : [];
  const sortedProducts = [...myProducts].sort((a, b) => {
    const rank = (p) => {
      const s = p?.approvalStatus || 'approved';
      if (s === 'approved') return 0;
      if (s === 'pending') return 1;
      return 2; // rejected or others
    };
    const rdiff = rank(a) - rank(b);
    if (rdiff !== 0) return rdiff;
    const aTime = new Date(a.createdAt).getTime() || 0;
    const bTime = new Date(b.createdAt).getTime() || 0;
    return bTime - aTime; // newer first within same status
  });
  const [deleting, setDeleting] = useState({});
  const [deleteErrorsById, setDeleteErrorsById] = useState({});

  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      setDeleteErrorsById((p) => ({ ...p, [id]: null }));
      setDeleting((p) => ({ ...p, [id]: true }));
      await dispatch(deleteProduct(id));
      await dispatch(fetchMyProducts());
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Delete failed";
      setDeleteErrorsById((p) => ({ ...p, [id]: msg }));
    }
    setDeleting((p) => ({ ...p, [id]: false }));
  };

  if (!currentUser) return <div>Please login.</div>;

  return (
    <section role="main" className="container-fluid content-body content-body-modern mt-0 my-products-status">
      <div className="mps-header d-flex justify-content-between align-items-center">
        <h3 className="mps-title">My Products Status</h3>
        <button className="btn btn-outline-primary" onClick={() => navigate('/ListProducts')}>Return</button>
      </div>
      {isFetching && <div className="mps-state">Loading...</div>}
      {!isFetching && myProducts.length === 0 && <div className="mps-state">No products submitted yet.</div>}
      <div className="row row-gutter-sm">
        {sortedProducts.map((product) => (
          <div className="col-sm-6 col-xl-3" key={product._id}>
            <div className="card card-modern card-modern-alt-padding mps-card">
              <div className="card-body bg-light">
                <div className="image-frame mb-2">
                  <div className="image-frame-wrapper">
                    <img style={{ borderRadius: "10px" }} src={product.imageCover} className="img-fluid" alt="img" />
                  </div>
                </div>
                <h4 className="text-4 line-height-2 mt-0 mb-2 mps-title-clamp">{product.title}</h4>
                <div className="product-description-wrapper">
                  <div className="description-clamp">{product.description}</div>
                </div>
                <div className="mt-2">
                  <span className={`badge me-2 mps-badge mps-${product.approvalStatus || 'approved'}`}>Status: {product.approvalStatus || 'approved'}</span>
                  {product.approvalStatus === 'rejected' && (
                    <>
                      <div className="text-danger small mt-2 mps-reason">Reason: {product.rejectionReason || 'No reason provided'}</div>
                      <div className="mt-2 d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          disabled={!!deleting[product._id]}
                          onClick={() => handleDelete(product._id)}
                        >
                          {deleting[product._id] ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                              Deleting
                            </>
                          ) : (
                            <>Delete</>
                          )}
                        </button>
                        {deleteErrorsById[product._id] && (
                          <span className="text-danger small">{deleteErrorsById[product._id]}</span>
                        )}
                      </div>
                    </>
                  )}
                  {product.approvalStatus === 'pending' && (
                    <div className="mt-2">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        disabled={!!deleting[product._id]}
                        onClick={() => handleDelete(product._id)}
                      >
                        {deleting[product._id] ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            Cancelling
                          </>
                        ) : (
                          <>Cancel Request</>
                        )}
                      </button>
                      {deleteErrorsById[product._id] && (
                        <span className="text-danger small ms-2">{deleteErrorsById[product._id]}</span>
                      )}
                    </div>
                  )}
                  {(product.approvalStatus === 'approved' || !product.approvalStatus) && (
                    <div className="mt-2 d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        disabled={!!deleting[product._id]}
                        onClick={() => handleDelete(product._id)}
                      >
                        {deleting[product._id] ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            Deleting
                          </>
                        ) : (
                          <>Delete</>
                        )}
                      </button>
                      {deleteErrorsById[product._id] && (
                        <span className="text-danger small">{deleteErrorsById[product._id]}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyProductsStatus;
