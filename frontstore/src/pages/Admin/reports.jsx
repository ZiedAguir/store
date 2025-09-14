import { useEffect, useState, useContext } from "react";
import Header from "../../componnent/Header/headerprofil";
import SideBar from "../../componnent/SideBare/sideBare";
import apiRequest from "../../componnent/axios/axiosInstance";
import { FormContext } from "../../componnent/context/AuthContext";

function ReportsPage() {
  const { currentUser } = useContext(FormContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resolving, setResolving] = useState({});
  const [deleting, setDeleting] = useState({});
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState(null);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiRequest.get('/reports');
      setReports(res.data?.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const resolveReport = async (id) => {
    try {
      setResolving(prev => ({ ...prev, [id]: true }));
      await apiRequest.patch(`/reports/${id}/resolve`);
      await loadReports();
    } catch (e) {
      alert(e?.response?.data?.message || e.message || 'Failed to resolve');
    } finally {
      setResolving(prev => ({ ...prev, [id]: false }));
    }
  };

  const deleteReport = async (id) => {
    try {
      setDeleting(prev => ({ ...prev, [id]: true }));
      await apiRequest.delete(`/reports/${id}`);
      await loadReports();
    } catch (e) {
      alert(e?.response?.data?.message || e.message || 'Failed to delete');
    } finally {
      setDeleting(prev => ({ ...prev, [id]: false }));
    }
  };

  const deleteAllReports = async () => {
    if (!window.confirm('Delete all reports?')) return;
    try {
      setBulkDeleting(true);
      await apiRequest.delete('/reports');
      await loadReports();
    } catch (e) {
      alert(e?.response?.data?.message || e.message || 'Failed to delete all');
    } finally {
      setBulkDeleting(false);
    }
  };

  const openProductDetails = async (productId) => {
    try {
      setProductLoading(true);
      setProductError(null);
      setViewingProduct(null);
      const res = await apiRequest.get(`/products/${productId}`);
      setViewingProduct(res.data?.data || null);
    } catch (e) {
      setProductError(e?.response?.data?.message || e.message);
    } finally {
      setProductLoading(false);
    }
  };

  const closeProductDetails = () => {
    setViewingProduct(null);
    setProductError(null);
  };

  const isAdmin = currentUser?.data?.role === 'admin' || currentUser?.data?.role === 'superadmin';
  if (!isAdmin) return <div className="p-4">Access denied.</div>;

  return (
    <section className="body">
      <Header />
      <div className="inner-wrapper">
        <aside id="sidebar-left" className="sidebar-left">
          <div className="sidebar-header">
            <SideBar />
          </div>
        </aside>
        <section role="main" className="content-body content-body-modern mt-0">
          <header className="page-header page-header-left-inline-breadcrumb">
            <h2 className="font-weight-bold text-6">Signals</h2>
            <div className="right-wrapper">
              <ol className="breadcrumbs">
                <li><span>Home</span></li>
                <li><span>Admin</span></li>
                <li><span>Signals</span></li>
              </ol>
            </div>
            <button className="checkout-back btn btn-light btn-sm ms-2" onClick={() => window.history.back()} title="Retour">
                <i className="fas fa-arrow-left" />
              </button>
          </header>
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Reported Products</h4>
              <button className="btn btn-sm btn-danger" onClick={deleteAllReports} disabled={bulkDeleting}>
                {bulkDeleting ? 'Deleting...' : 'Delete All'}
              </button>
            </div>
            <div className="card-body">
              {loading && <p>Loading...</p>}
              {error && <p className="text-danger">{error}</p>}
              {!loading && !error && (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Reason</th>
                        <th>Reporter</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((r) => (
                        <tr key={r._id}>
                          <td style={{ maxWidth: 220 }}>
                            <div className="d-flex align-items-center gap-2">
                              {r.product?.imageCover && (
                                <img src={r.product.imageCover} alt="prod" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6 }} />
                              )}
                              <button className="btn btn-link p-0 text-truncate" title="View details" onClick={() => openProductDetails(r.product?._id)}>
                                {r.product?.title || 'Product'}
                              </button>
                            </div>
                          </td>
                          <td style={{ maxWidth: 260 }} className="text-truncate">{r.reason}</td>
                          <td>{r.reporter?.name || r.reporter?.email || 'User'}</td>
                          <td><span className={`badge ${r.status === 'open' ? 'badge-warning' : 'badge-success'}`}>{r.status}</span></td>
                          <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                          <td className="d-flex gap-2">
                            {r.status === 'open' && (
                              <button className="btn btn-sm btn-success" disabled={!!resolving[r._id]} onClick={() => resolveReport(r._id)}>
                                {resolving[r._id] ? 'Resolving...' : 'Resolve'}
                              </button>
                            )}
                            <button className="btn btn-sm btn-outline-danger" disabled={!!deleting[r._id]} onClick={() => deleteReport(r._id)}>
                              {deleting[r._id] ? 'Deleting...' : 'Delete'}
                            </button>
                          </td>
                        </tr>
                      ))}
                      {reports.length === 0 && (
                        <tr><td colSpan={6} className="text-center">No reports.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      {viewingProduct && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Product Details</h5>
                <button type="button" className="close" onClick={closeProductDetails}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {productLoading && <p>Loading...</p>}
                {productError && <p className="text-danger">{productError}</p>}
                {!productLoading && !productError && (
                  <div className="row">
                    <div className="col-md-5">
                      <img src={viewingProduct.imageCover} alt={viewingProduct.title} className="img-fluid rounded" />
                    </div>
                    <div className="col-md-7">
                      <h4>{viewingProduct.title}</h4>
                      <p className="text-muted">{viewingProduct.description}</p>
                      <p><strong>Price:</strong> ${viewingProduct.price}</p>
                      {viewingProduct.priceAfterDiscount && (
                        <p><strong>After Discount:</strong> ${viewingProduct.priceAfterDiscount}</p>
                      )}
                      <p><strong>Stock:</strong> {viewingProduct.stockStatus}</p>
                      <p><strong>Rating:</strong> {"⭐".repeat(viewingProduct.ratingsAverage || 0)}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeProductDetails}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ReportsPage;


