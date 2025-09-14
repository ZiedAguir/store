import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ShopDetails from "../HomeProductPage/ComponentPage/shopDetails";
import "./cardPrincipal.css";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../Redux/Action/productActions";
import { FormContext } from "../../../componnent/context/AuthContext";
import apiRequest from "../../../componnent/axios/axiosInstance";

function CardPrincipal({ products }) {
  const [showDetails, setShowDetails] = useState(false);
  const [expandedDescriptionById, setExpandedDescriptionById] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useContext(FormContext);
  const [reportingProduct, setReportingProduct] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportError, setReportError] = useState(null);

  // Debug: Log current user data
  console.log('Current user data:', currentUser);
  console.log('Products with creators:', products.map(p => ({ 
    id: p._id, 
    title: p.title, 
    creator: p.creator 
  })));

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedProduct(null);
  };
  const toggleDescriptionExpand = (productId) => {
    setExpandedDescriptionById((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };
  const addToBasket = (product) => {
    return {
      type: "basket/addToBasket",
      payload: {
        ...product,
        uniqueId: `${product._id}-${Date.now()}`, 
      },
    };
  };
  const handleAddToCart = (product) => {
    dispatch(addToBasket(product)); 
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEdit = (product) => {
    // Navigate to edit page
    console.log('Edit product:', product);
    navigate(`/edit-product/${product._id}`);
  };

  const openReportModal = (product) => {
    setReportingProduct(product);
    setReportReason("");
    setReportError(null);
  };

  const closeReportModal = () => {
    setReportingProduct(null);
    setReportReason("");
    setReportError(null);
  };

  const submitReport = async () => {
    if (!reportReason.trim()) {
      setReportError("Please provide a reason.");
      return;
    }
    try {
      setReportSubmitting(true);
      setReportError(null);
      await apiRequest.post('/reports', { productId: reportingProduct._id, reason: reportReason.trim() });
      closeReportModal();
      alert('Report submitted');
    } catch (e) {
      const msg = e?.response?.data?.message || e.message || 'Failed to submit report';
      setReportError(msg);
    } finally {
      setReportSubmitting(false);
    }
  };

  // Check if user can delete the product
  const canDeleteProduct = (product) => {
    if (!currentUser || !currentUser.data) return false;
    
    const userRole = currentUser.data.role;
    const userId = currentUser.data._id;
    
    console.log('Checking delete permissions:', {
      userRole,
      userId,
      productCreator: product.creator,
      productCreatorId: product.creator?._id || product.creator
    });
    
    // Admin and superadmin can delete any product
    if (userRole === 'admin' || userRole === 'superadmin') return true;
    
    // Product creator can delete their own product
    // Handle both populated and unpopulated creator fields
    const creatorId = product.creator?._id || product.creator;
    if (creatorId && creatorId.toString() === userId.toString()) return true;
    
    // For now, allow deletion of products without creator (existing products)
    if (!product.creator && (userRole === 'admin' || userRole === 'superadmin')) return true;
    
    return false;
  };

  // Check if user can edit the product
  const canEditProduct = (product) => {
    if (!currentUser || !currentUser.data) return false;
    
    const userRole = currentUser.data.role;
    const userId = currentUser.data._id;
    
    console.log('Checking edit permissions:', {
      userRole,
      userId,
      productCreator: product.creator,
      productCreatorId: product.creator?._id || product.creator
    });
    
    // Admin and superadmin can edit any product
    if (userRole === 'admin' || userRole === 'superadmin') return true;
    
    // Product creator can edit their own product
    // Handle both populated and unpopulated creator fields
    const creatorId = product.creator?._id || product.creator;
    if (creatorId && creatorId.toString() === userId.toString()) return true;
    
    // For now, allow editing of products without creator (existing products)
    if (!product.creator && (userRole === 'admin' || userRole === 'superadmin')) return true;
    
    return false;
  };

  return (
    <div className="products-list-container">
      <div className="row row-gutter-sm">
        {products.length > 0 ? (
          products.map((product) => (
            <motion.div
              key={product._id}
              className="col-sm-6 col-xl-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="card card-modern card-modern-alt-padding">
                <div className="card-body bg-light">
                  <div className="image-frame mb-2">
                    <div className="image-frame-wrapper" >
                      <a href="#" >
                        <img style={{borderRadius:"10px"}} src={product.imageCover} className="img-fluid" alt="img" />
                      </a>
                    </div>
                  </div>
                  
                  <h4 className="text-4 line-height-2 mt-0 mb-2">
                    <a href="#" className="ecommerce-sidebar-link text-color-dark text-color-hover-primary text-decoration-none">
                      {product.title}
                    </a>
                  </h4>
                  <div className="stars-wrapper">
                    {"⭐".repeat(product.ratingsAverage)}
                  </div>
                  <div className="product-price">
                    <div className="regular-price on-sale">${product.priceAfterDiscount}</div>
                    <div className="sale-price">${product.price}</div>
                  </div>
                  <div className="product-description-wrapper">
                    <div
                      className={
                        expandedDescriptionById[product._id]
                          ? "description-expanded"
                          : "description-clamp"
                      }
                    >
                      {product.description}
                    </div>
                    {product?.description && product.description.length > 80 && (
                      <button
                        type="button"
                        className="btn btn-link p-0 mt-1 description-toggle"
                        onClick={() => toggleDescriptionExpand(product._id)}
                      >
                        {expandedDescriptionById[product._id] ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                  <div className="card-footer border mt-4 p-2">
                    <div className="card-actions-grid">
                      <button onClick={() => handleViewDetails(product)} className="btn btn-sm action-btn view-detail-btn">
                        <i className="fas fa-eye me-1" /> View 
                      </button>
                      <button onClick={() => handleAddToCart(product)} className="btn btn-sm action-btn add-to-cart-btn">
                        <i className="fas fa-shopping-cart me-1" /> Add 
                      </button>
                      {currentUser && (
                        <button
                          type="button"
                          className="btn btn-sm action-btn btn-outline-secondary"
                          title="Report"
                          onClick={() => openReportModal(product)}
                        >
                          <i className="fas fa-flag"></i>
                        </button>
                      )}
                      {canEditProduct(product) && (
                        <button 
                          onClick={() => handleEdit(product)}
                          className="btn btn-sm action-btn edit-btn"
                          title={currentUser?.data?.role === 'admin' || currentUser?.data?.role === 'superadmin' 
                            ? "Admin: Can edit any product" 
                            : "Edit your product"}
                        >
                          <i className="fas fa-edit me-1" /> Edit
                        </button>
                      )}
                      {canDeleteProduct(product) && (
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="btn btn-sm action-btn delete-btn"
                          title={currentUser?.data?.role === 'admin' || currentUser?.data?.role === 'superadmin' 
                            ? "Admin: Can delete any product" 
                            : "Delete your product"}
                        >
                          <i className="fas fa-trash-alt me-1" /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p>Aucun produit disponible.</p>
        )}
      </div>

      {showDetails && (
        <div className={`details-container ${showDetails ? "show" : ""}`} style={{marginTop:"30rem"}}>
          <ShopDetails product={selectedProduct} />
          <button onClick={handleCloseDetails} className="details-close-btn">
            Close Details
          </button>
        </div>
      )}
      {reportingProduct && (
        <div className="details-container show" style={{ marginTop: "10rem" }}>
          <h4>Report Product</h4>
          <p className="text-muted mb-2">{reportingProduct.title}</p>
          <textarea
            className="form-control"
            rows={3}
            placeholder="Reason for reporting..."
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
          />
          {reportError && <p className="text-danger mt-2">{reportError}</p>}
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-secondary" onClick={closeReportModal} disabled={reportSubmitting}>Cancel</button>
            <button className="btn btn-danger" onClick={submitReport} disabled={reportSubmitting}>
              {reportSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardPrincipal;

