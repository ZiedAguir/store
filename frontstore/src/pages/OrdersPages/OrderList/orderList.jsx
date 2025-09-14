import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../../componnent/axios/axiosInstance";
import { FormContext } from "../../../componnent/context/AuthContext";
import "./orderList.css"

function OrderList1() {
  const { currentUser } = useContext(FormContext) || {};
  const role = currentUser?.data?.role || currentUser?.role || 'user';
  const isAdmin = role === 'admin' || role === 'superadmin';
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [sort, setSort] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [pagination, setPagination] = useState({ currentPage: 1, numberOfPages: 1 });
  const [targetPageForDelete, setTargetPageForDelete] = useState(1);
  const navigate = useNavigate();

  const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', String(limit));
        if (sort) params.set('sort', sort);
        const { data } = await apiRequest.get(`/orders?${params.toString()}`);
        let fetched = Array.isArray(data?.data) ? data.data : data?.data?.data || [];
        if (statusFilter !== 'all') {
          fetched = fetched.filter((o) => {
            if (statusFilter === 'completed') return o.isDelivered === true;
            if (statusFilter === 'waiting') return !o.isDelivered && !o.isPaid; // heuristic
            if (statusFilter === 'out_of_stock') {
              const items = Array.isArray(o.cartItems) ? o.cartItems : [];
              return items.some(ci => ci?.product?.stockStatus === 'out-of-stock');
            }
            return true;
          });
        }
        const isCompleted = (o) => (o.adminStatus === 'completed') || (!!o.isDelivered);
        const others = fetched.filter(o => !isCompleted(o));
        const completed = fetched.filter(o => isCompleted(o));
        setOrders([...others, ...completed]);
        if (data?.paginationResult) {
          setPagination(data.paginationResult);
        } else if (data?.data?.paginationResult) {
          setPagination(data.data.paginationResult);
        }
      } catch (err) {
        setError(err?.response?.data?.message || err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit, sort, statusFilter]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this order?');
    if (!confirmed) return;
    try {
      await apiRequest.delete(`/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || err.message || 'Failed to delete order');
    }
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString();
    } catch {
      return '';
    }
  };

  const renderStatusClass = (order) => {
    // Admin override if set
    if (order.adminStatus === 'out_of_stock') return 'canceled';
    if (order.adminStatus === 'completed') return 'completed';
    if (order.adminStatus === 'waiting') return 'on-hold';
    // Fallback heuristic
    const hasOutOfStock = Array.isArray(order.cartItems) && order.cartItems.some(
      (ci) => ci?.product?.stockStatus === 'out-of-stock'
    );
    if (hasOutOfStock) return 'canceled';
    if (order.isDelivered) return 'completed';
    return 'on-hold';
  };

  const renderStatusLabel = (order) => {
    if (order.adminStatus === 'out_of_stock') return 'Out of Stock';
    if (order.adminStatus === 'completed') return 'Completed';
    if (order.adminStatus === 'waiting') return 'Waiting';
    const hasOutOfStock = Array.isArray(order.cartItems) && order.cartItems.some(
      (ci) => ci?.product?.stockStatus === 'out-of-stock'
    );
    if (hasOutOfStock) return 'Out of Stock';
    if (order.isDelivered) return 'Completed';
    return 'Waiting';
  };

  const colSpan = isAdmin ? 7 : 6;

  const isAllSelected = orders.length > 0 && selectedIds.length === orders.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(orders.map(o => o._id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleBulkApply = async () => {
    if (selectedIds.length === 0) {
      alert('Select at least one order.');
      return;
    }
    if (bulkAction === 'delete') {
      const confirmed = window.confirm(`Delete ${selectedIds.length} selected order(s)?`);
      if (!confirmed) return;
      try {
        await Promise.all(selectedIds.map(id => apiRequest.delete(`/orders/${id}`)));
        setOrders((prev) => prev.filter(o => !selectedIds.includes(o._id)));
        setSelectedIds([]);
        setBulkAction('');
      } catch (err) {
        alert(err?.response?.data?.message || err.message || 'Failed to apply bulk action');
      }
      return;
    }
    if (bulkAction?.startsWith('status:')) {
      if (!isAdmin) {
        alert('Only admins can change status');
        return;
      }
      const status = bulkAction.split(':')[1];
      try {
        await apiRequest.put('/orders/admin-status', { orderIds: selectedIds, status });
        setOrders((prev) => prev.map(o => selectedIds.includes(o._id) ? { ...o, adminStatus: status } : o));
        setSelectedIds([]);
        setBulkAction('');
      } catch (err) {
        alert(err?.response?.data?.message || err.message || 'Failed to update status');
      }
      return;
    }
  };

  const handleDeletePage = async () => {
    const pageToDelete = Number(targetPageForDelete) || 1;
    const confirmed = window.confirm(`Delete all orders on page ${pageToDelete}?`);
    if (!confirmed) return;
    try {
      const params = new URLSearchParams();
      params.set('page', String(pageToDelete));
      params.set('limit', String(limit));
      if (sort) params.set('sort', sort);
      const { data } = await apiRequest.get(`/orders?${params.toString()}`);
      const pageOrders = Array.isArray(data?.data) ? data.data : data?.data?.data || [];
      if (pageOrders.length === 0) {
        alert('No orders on that page.');
        return;
      }
      await Promise.all(pageOrders.map(o => apiRequest.delete(`/orders/${o._id}`)));
      // Refresh current list
      fetchOrders();
    } catch (err) {
      alert(err?.response?.data?.message || err.message || 'Failed to delete page');
    }
  };

  return (
    <div>
      <section role="main" className="content-body content-body-modern mt-0 fade-in">
        <header className="page-header page-header-left-inline-breadcrumb fade-in">
          <h2 className="font-weight-bold text-6">{isAdmin ? 'Orders' : 'My Orders'}</h2>
          <div className="right-wrapper">
            <ol className="breadcrumbs">
              <li><span>Home</span></li>
              <li><span>eCommerce</span></li>
              <li><span>Orders</span></li>
            </ol>
          </div>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)} title="Retour">
             <i className="fas fa-arrow-left" />
           </button>
          
        </header>

        <div className="row">
          <div className="col">
            <div className="card card-modern">
              <div className="card-body">
                <div className="datatables-header-footer-wrapper">
                  <div className="datatable-header">
                    <div className="row align-items-center mb-3">
                      <div className="col-12 col-lg-auto mb-3 mb-lg-0">
                        <a
                          href="/OrderForm"
                          className="btn btn-primary btn-md font-weight-semibold btn-py-2 px-4 bounce-button"
                        >
                          + Add Order
                        </a>
                      </div>
                      <div className="col-8 col-lg-auto ms-auto ml-auto mb-3 mb-lg-0">
                        <div className="d-flex align-items-lg-center flex-column flex-lg-row">
                          <label className="ws-nowrap me-3 mb-0">Filter By:</label>
                          <select
                            className="form-control select-style-1 filter-by"
                            name="filter-by"
                            value={sort}
                            onChange={(e) => { setPage(1); setSort(e.target.value); }}
                          >
                            <option value="">Default</option>
                            <option value="-createdAt">Newest</option>
                            <option value="createdAt">Oldest</option>
                            <option value="-totalOrderPrice">Total (High → Low)</option>
                            <option value="totalOrderPrice">Total (Low → High)</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-4 col-lg-auto ps-lg-1 mb-3 mb-lg-0">
                        <div className="d-flex align-items-lg-center flex-column flex-lg-row">
                          <label className="ws-nowrap me-3 mb-0">Show:</label>
                          <select
                            className="form-control select-style-1 results-per-page"
                            name="results-per-page"
                            value={limit}
                            onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }}
                          >
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                            <option value={36}>36</option>
                            <option value={100}>100</option>
                          </select>
                        </div>
                      </div>
                      {isAdmin && (
                        <div className="col-12 col-lg-auto ps-lg-1 mb-3 mb-lg-0">
                          
                        </div>
                      )}
                      
                    </div>
                  </div>

                  <table
                    className="table table-ecommerce-simple table-borderless table-striped mb-0"
                    id="datatable-ecommerce-list"
                    style={{ minWidth: 640 }}
                  >
                    <thead>
                      <tr>
                        <th width="3%">
                          <input
                            type="checkbox"
                            name="select-all"
                            className="select-all checkbox-style-1 p-relative top-2"
                            checked={isAllSelected}
                            onChange={toggleSelectAll}
                          />
                        </th>
                        <th width="8%">ID</th>
                        {isAdmin && (<th width="28%">Customer Name</th>)}
                        <th width="18%">Date</th>
                        <th width="18%">Total</th>
                        <th width="15%">Status</th>
                        <th width="10%">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading && (
                        <tr><td colSpan={colSpan}>Loading...</td></tr>
                      )}
                      {!loading && error && (
                        <tr><td colSpan={colSpan} style={{ color: 'red' }}>{error}</td></tr>
                      )}
                      {!loading && !error && orders.length === 0 && (
                        <tr><td colSpan={colSpan}>No orders found.</td></tr>
                      )}
                      {!loading && !error && orders.map((order) => (
                        <tr key={order._id}>
                          <td width={30}>
                            <input
                              type="checkbox"
                              className="checkbox-style-1 p-relative top-2"
                              checked={selectedIds.includes(order._id)}
                              onChange={() => toggleSelectOne(order._id)}
                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-link p-0"
                              onClick={() => navigate('/OrderForm', { state: { order } })}
                            >
                              <strong>{String(order._id).slice(-6).toUpperCase()}</strong>
                            </button>
                          </td>
                          {isAdmin && (
                            <td>
                              <a href="#">
                                <strong>{order.user?.name || order.user?.email || 'N/A'}</strong>
                              </a>
                            </td>
                          )}
                          <td>{formatDate(order.createdAt)}</td>
                          <td>${order.totalOrderPrice?.toFixed?.(2) || order.totalOrderPrice || 0}</td>
                          <td>
                            <span className={`ecommerce-status ${renderStatusClass(order)}`}>
                              {renderStatusLabel(order)}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(order._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <hr className="solid mt-5 opacity-4" />
                  <div className="datatable-footer">
                    <div className="row align-items-center justify-content-between mt-3">
                      <div className="col-md-auto order-1 mb-3 mb-lg-0">
                        <div className="d-flex align-items-stretch">
                          <div className="d-grid gap-3 d-md-flex justify-content-md-end me-4">
                            <select
                              className="form-control select-style-1 bulk-action"
                              name="bulk-action"
                              style={{ minWidth: 170 }}
                              value={bulkAction}
                              onChange={(e) => setBulkAction(e.target.value)}
                            >
                              <option value="">Bulk Actions</option>
                              <option value="delete">Delete</option>
                              {isAdmin && <option value="status:completed">Mark as Completed</option>}
                              {isAdmin && <option value="status:waiting">Mark as Waiting</option>}
                              {isAdmin && <option value="status:out_of_stock">Mark as Out of Stock</option>}
                            </select>
                            <button
                              className="bulk-action-apply btn btn-light btn-px-4 py-3 border font-weight-semibold text-color-dark text-3"
                              onClick={handleBulkApply}
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-auto text-center order-3 order-lg-2">
                        
                      </div>
                      <div className="col-lg-auto order-2 order-lg-3 mb-3 mb-lg-0">
                        <div className="pagination-wrapper" />
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrderList1;
 