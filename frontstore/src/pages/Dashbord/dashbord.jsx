import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import UserInfoCard from "./userProfil";
import StatisticsCard from "./statisticCard";
import Header from "../../componnent/Header/headerprofil";
import SideBar from "../../componnent/SideBare/sideBare";
import TopSellingProducts from "./topselling";
import RevenueCard from "./revenuCard";
import CustomersByLocation from "./customerbyLocation";
import MyProductsCard from "./myProductsCard";
import apiRequest from "../../componnent/axios/axiosInstance";
import { FormContext } from "../../componnent/context/AuthContext";

function Dashboard() {
  const { currentUser } = useContext(FormContext);
  const [showConfetti, setShowConfetti] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 20,
    numberOfPages: 1,
    next: null
  });
  
  // État pour le modal de modification
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    active: true
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  
  // Dashboard statistics state
  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    thisMonthRevenue: 0,
    lastMonthRevenue: 0,
    averageOrderValue: 0,
    revenueTrend: 0,
    orderTrend: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);
  // Users filter state
  const [userKeyword, setUserKeyword] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('');
  
  // Revenue data state
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    thisMonthRevenue: 0,
    lastMonthRevenue: 0,
    percentageChange: 0,
    monthlyRevenue: []
  });
  const [revenueLoading, setRevenueLoading] = useState(true);
  const [revenueError, setRevenueError] = useState(null);

  // User's products state
  const [myProducts, setMyProducts] = useState({
    count: 0,
    products: []
  });
  const [myProductsLoading, setMyProductsLoading] = useState(true);
  const [myProductsError, setMyProductsError] = useState(null);

  // Function to trigger confetti
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  // Fetch dashboard statistics
  const fetchDashboardStats = async () => {
    try {
      setStatsLoading(true);
      const response = await apiRequest.get('/dashboard/stats');
      setDashboardStats(response.data.data);
      setStatsError(null);
    } catch (err) {
      setStatsError("Erreur lors du chargement des statistiques");
      console.error("Error fetching dashboard stats:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  // Fetch revenue data
  const fetchRevenueData = async () => {
    try {
      setRevenueLoading(true);
      const response = await apiRequest.get('/dashboard/revenue');
      setRevenueData(response.data.data);
      setRevenueError(null);
    } catch (err) {
      setRevenueError("Erreur lors du chargement des données de revenus");
      console.error("Error fetching revenue data:", err);
    } finally {
      setRevenueLoading(false);
    }
  };

  // Fetch user's products
  const fetchMyProducts = async () => {
    try {
      setMyProductsLoading(true);
      const response = await apiRequest.get('/dashboard/my-products');
      setMyProducts(response.data.data);
      setMyProductsError(null);
    } catch (err) {
      setMyProductsError("Erreur lors du chargement de vos produits");
      console.error("Error fetching my products:", err);
    } finally {
      setMyProductsLoading(false);
    }
  };

  // Fetch users from API
  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const keywordParam = userKeyword ? `&keyword=${encodeURIComponent(userKeyword)}` : '';
      const roleParam = userRoleFilter ? `&role=${encodeURIComponent(userRoleFilter)}` : '';
      const response = await apiRequest.get(`/users?page=${page}&limit=${pagination.limit}${keywordParam}${roleParam}`);
      setUsers(response.data.data);
      setPagination(response.data.paginationResult);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des utilisateurs");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Ouvrir le modal de modification
  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "user",
      active: user.active || true
    });
    setShowEditModal(true);
    setUpdateError(null);
  };

  // Fermer le modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
    setUpdateError(null);
  };

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Mettre à jour l'utilisateur
  const updateUser = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    
    try {
      setUpdateLoading(true);
      setUpdateError(null);
      
      await apiRequest.put(`/users/${selectedUser._id}`, formData);
      
      // Rafraîchir la liste des utilisateurs
      fetchUsers(pagination.currentPage);
      
      // Fermer le modal
      closeEditModal();
      alert("Utilisateur mis à jour avec succès");
    } catch (err) {
      setUpdateError(err.response?.data?.message || "Erreur lors de la mise à jour");
      console.error("Error updating user:", err);
    } finally {
      setUpdateLoading(false);
    }
  };

  // Delete user function
  const deleteUser = async (userId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await apiRequest.delete(`/users/${userId}`);
        // Refresh the user list after deletion
        fetchUsers(pagination.currentPage);
        alert("Utilisateur supprimé avec succès");
      } catch (err) {
        alert("Erreur lors de la suppression de l'utilisateur");
        console.error("Error deleting user:", err);
      }
    }
  };

  // Promote user function
  const promoteUser = async (userId, currentRole) => {
    let newRole;
    let confirmMessage;
    
    // Determine the next role based on current role
    if (currentRole === 'user') {
      newRole = 'admin';
      confirmMessage = `Êtes-vous sûr de vouloir promouvoir cet utilisateur au rôle d'administrateur ?`;
    } else if (currentRole === 'admin') {
      newRole = 'superadmin';
      confirmMessage = `Êtes-vous sûr de vouloir promouvoir cet administrateur au rôle de super administrateur ?`;
    } else {
      alert("Cet utilisateur a déjà le niveau de rôle le plus élevé.");
      return;
    }

    if (window.confirm(confirmMessage)) {
      try {
        setUpdateLoading(true);
        await apiRequest.put(`/users/${userId}/promote`, { newRole });
        // Refresh the user list after promotion
        fetchUsers(pagination.currentPage);
        alert(`Utilisateur promu avec succès au rôle de ${newRole}`);
        // Trigger confetti for celebration
        triggerConfetti();
      } catch (err) {
        alert("Erreur lors de la promotion de l'utilisateur");
        console.error("Error promoting user:", err);
      } finally {
        setUpdateLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchDashboardStats();
    fetchRevenueData();
    fetchMyProducts();
  }, []);

  return (
    <section className="body">
      {/* Animated Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}
          >
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={200}
              gravity={0.3}
              colors={["#FF5733", "#33FFBD", "#FFC300", "#DAF7A6", "#900C3F"]}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de modification d'utilisateur */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <motion.div
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -50 }}
              className="modal-dialog modal-lg"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modifier l`&apos;`utilisateur</h5>
                  <button type="button" className="close" onClick={closeEditModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form onSubmit={updateUser}>
                  <div className="modal-body">
                    {updateError && (
                      <div className="alert alert-danger" role="alert">
                        {updateError}
                      </div>
                    )}
                    
                    <div className="form-group">
                      <label htmlFor="name">Nom</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Téléphone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="role">Rôle</label>
                      <select
                        className="form-control"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                      >
                        <option value="user">Utilisateur</option>
                        <option value="admin">Administrateur</option>
                        <option value="superadmin">Super Administrateur</option>
                      </select>
                    </div>
                    
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="active"
                        name="active"
                        checked={formData.active}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="active">
                        Utilisateur actif
                      </label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
                      Annuler
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={updateLoading}>
                      {updateLoading ? "Mise à jour..." : "Mettre à jour"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      <div className="inner-wrapper">
        <aside id="sidebar-left" className="sidebar-left">
          <SideBar />
        </aside>

        <section role="main" className="content-body content-body-modern">
          <header className="page-header page-header-left-inline-breadcrumb">
            <h2 className="font-weight-bold text-6">Dashboard</h2>
            <div className="right-wrapper">
              <ol className="breadcrumbs">
                <li><span>Home</span></li>
                <li><span>eCommerce Dashboard</span></li>
              </ol>
              
              <button className="checkout-back btn btn-light btn-sm ms-2" onClick={() => window.history.back()} title="Retour">
                <i className="fas fa-arrow-left" />
              </button>
            </div>
          </header>

          {/* Start: Page */}
          {statsLoading && (
            <div className="row">
              <div className="col-12">
                <div className="alert alert-info">
                  <i className="fas fa-spinner fa-spin me-2"></i>
                  Chargement des statistiques du tableau de bord...
                </div>
              </div>
            </div>
          )}
          
          {statsError && (currentUser && (currentUser?.data?.role === 'admin' || currentUser?.data?.role === 'superadmin' || currentUser?.role === 'admin' || currentUser?.role === 'superadmin')) && (
            <div className="row">
              <div className="col-12">
                <div className="alert alert-danger">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {statsError}
                </div>
              </div>
            </div>
          )}
          
          <div className="row">
            <div className="col-lg-12 col-xl-4">
                             {currentUser ? (
                 <UserInfoCard 
                   name={currentUser?.data?.name || currentUser?.name || "User"} 
                   balance={`$${revenueData.totalRevenue || 0}`}
                   products={dashboardStats.totalProducts || 0}
                   role={currentUser?.data?.role || currentUser?.role || "User"}
                 />
               ) : (
                <div className="card card-modern">
                  <div className="card-body p-4 text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 mb-0">Loading user information...</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* My Products Card - Positioned after the name/UserInfoCard */}
            <div className="col-lg-12 col-xl-4">
              <MyProductsCard
                count={myProducts.count}
                products={myProducts.products}
                loading={myProductsLoading}
                error={myProductsError}
              />
            </div>
            <div className="col-lg-6 col-xl-12 pb-2 pb-lg-0 mb-4 mb-lg-0">
              {statsLoading ? (
                <div className="card card-modern">
                  <div className="card-body py-4 text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 mb-0">Loading statistics...</p>
                  </div>
                </div>
              ) : (
                <StatisticsCard 
                  title="Total Orders" 
                  value={dashboardStats.totalOrders} 
                  trend={dashboardStats.orderTrend > 0 ? "UP" : "DOWN"} 
                />
              )}
            </div>
            <div className="col-lg-6 col-xl-12 pt-xl-2 mt-xl-4">
              {statsLoading ? (
                <div className="card card-modern">
                  <div className="card-body py-4 text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 mb-0">Loading statistics...</p>
                  </div>
                </div>
              ) : (
                <StatisticsCard 
                  title="Average Order Value" 
                  value={`$${dashboardStats.averageOrderValue}`} 
                  trend={dashboardStats.revenueTrend > 0 ? "UP" : "DOWN"} 
                />
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-xl-8 pt-2 pt-xl-0 mt-4 mt-xl-0">
              {revenueLoading ? (
                <div className="card revenue-card shadow-sm border-0">
                  <div className="card-body text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 mb-0">Loading revenue data...</p>
                  </div>
                </div>
              ) : (revenueError && (currentUser && (currentUser?.data?.role === 'admin' || currentUser?.data?.role === 'superadmin' || currentUser?.role === 'admin' || currentUser?.role === 'superadmin'))) ? (
                <div className="card revenue-card shadow-sm border-0">
                  <div className="card-body text-center">
                    <div className="alert alert-danger">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {revenueError}
                    </div>
                  </div>
                </div>
              ) : revenueError ? (
                null
              ) : (
                <RevenueCard
                  thisMonth={`$${revenueData.thisMonthRevenue}`}
                  lastMonth={`$${revenueData.lastMonthRevenue}`}
                  totalProfit={`$${revenueData.totalRevenue}`}
                />
              )}
            </div>
          </div>

          {/* Dashboard Statistics Row - Only visible for Admin and SuperAdmin */}
          {currentUser && (currentUser?.data?.role === 'admin' || currentUser?.data?.role === 'superadmin' || currentUser?.role === 'admin' || currentUser?.role === 'superadmin') && (
            <div className="row">
              <div className="col-lg-6 col-xl-4">
                {statsLoading ? (
                  <div className="card card-modern">
                    <div className="card-body py-4 text-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-2 mb-0">Loading statistics...</p>
                    </div>
                  </div>
                ) : (
                  <StatisticsCard 
                    title="Total Customers" 
                    value={dashboardStats.totalCustomers} 
                    trend="UP" 
                  />
                )}
              </div>
              <div className="col-lg-6 col-xl-4 pt-2 pt-lg-0 mt-4 mt-lg-0">
                <TopSellingProducts />
              </div>
              <div className="col-lg-12 col-xl-4 pt-2 pt-xl-0 mt-4 mt-xl-0">
                <CustomersByLocation />
              </div>
            </div>
          )}

          {/* Users Management Section */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Gestion des Utilisateurs</h5>
                  <p className="card-subtitle text-muted mb-0">
                    Gérez les utilisateurs et promouvez-les vers des rôles plus élevés
                  </p>
                </div>
                <div className="card-body">
                  {/* Filters: name search and role filter */}
                  <form className="row g-2 align-items-end mb-3" onSubmit={(e)=>{e.preventDefault(); fetchUsers(1);}}>
                    <div className="col-md-6">
                      <label className="form-label">Search by name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type a name..."
                        value={userKeyword}
                        onChange={(e)=> setUserKeyword(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Filter by role</label>
                      <select
                        className="form-select"
                        value={userRoleFilter}
                        onChange={(e)=> setUserRoleFilter(e.target.value)}
                      >
                        <option value="">All roles</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                      </select>
                    </div>
                    <div className="col-md-2 d-flex gap-2">
                      <button type="submit" className="btn btn-primary w-100">Filter</button>
                    </div>
                    <div className="col-12 mt-1">
                      <button type="button" className="btn btn-sm btn-light" onClick={()=>{ setUserKeyword(''); setUserRoleFilter(''); fetchUsers(1); }}>Clear filters</button>
                    </div>
                  </form>
                  {/* Promotion Rules Info */}
                  <div className="alert alert-info mb-3" style={{ fontSize: '0.9rem' }}>
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Règles de promotion :</strong>
                    <ul className="mb-0 mt-2">
                      <li><strong>User</strong> → <strong>Admin</strong> : Peut gérer les utilisateurs et les produits</li>
                      <li><strong>Admin</strong> → <strong>Super Admin</strong> : Accès complet à toutes les fonctionnalités</li>
                      <li>Seuls les admins et super admins peuvent promouvoir les utilisateurs</li>
                    </ul>
                  </div>
                  
                  {loading && <p>Chargement des utilisateurs...</p>}
                  {error && <p className="text-danger">{error}</p>}
                  
                  {!loading && !error && (
                    <>
                      <div className="table-responsive">
                        <table className="table table-striped" style={{ fontSize: '0.9rem' }}>
                          <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                              <th style={{ borderTop: 'none', fontWeight: '600' }}>Nom</th>
                              <th style={{ borderTop: 'none', fontWeight: '600' }}>Email</th>
                              <th style={{ borderTop: 'none', fontWeight: '600' }}>Rôle</th>
                              <th style={{ borderTop: 'none', fontWeight: '600' }}>Statut</th>
                              <th style={{ borderTop: 'none', fontWeight: '600' }}>Date de création</th>
                              <th style={{ borderTop: 'none', fontWeight: '600' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map(user => (
                              <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                  <span className={`badge ${user.role === 'admin' || user.role === 'superadmin' ? 'badge-success' : 'badge-primary'}`}>
                                    {user.role}
                                  </span>
                                  {(user.role === 'user' || user.role === 'admin') && (
                                    <span className="badge badge-warning ml-2" style={{ fontSize: '0.7rem' }}>
                                      <i className="fas fa-arrow-up me-1"></i>
                                      Promotable
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <span className={`badge ${user.active ? 'badge-success' : 'badge-danger'}`}>
                                    {user.active ? 'Actif' : 'Inactif'}
                                  </span>
                                </td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                  <div className="d-flex flex-wrap gap-1">
                                    {/* Edit button removed per request */}
                                    <button 
                                      className="btn btn-danger btn-sm"
                                      onClick={() => deleteUser(user._id)}
                                      style={{
                                        minWidth: '80px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500'
                                      }}
                                    >
                                      <i className="fas fa-trash me-1"></i>
                                      Supprimer
                                    </button>
                                    {(user.role === 'user' || user.role === 'admin') && (
                                      <button 
                                        className="btn btn-success btn-sm"
                                        onClick={() => promoteUser(user._id, user.role)}
                                        title={`Promouvoir au rôle de ${user.role === 'user' ? 'administrateur' : 'super administrateur'}`}
                                        disabled={updateLoading}
                                        style={{
                                          minWidth: '120px',
                                          fontSize: '0.8rem',
                                          fontWeight: '500'
                                        }}
                                      >
                                        {updateLoading ? (
                                          <span>
                                            <i className="fas fa-spinner fa-spin me-1"></i>
                                            Loading...
                                          </span>
                                        ) : (
                                          <span>
                                            <i className="fas fa-arrow-up me-1"></i>
                                            Add Responsible
                                          </span>
                                          )}
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Pagination Controls */}
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                          Page {pagination.currentPage} sur {pagination.numberOfPages}
                        </div>
                        <div>
                          <button 
                            className="btn btn-secondary mr-2" 
                            disabled={pagination.currentPage === 1}
                            onClick={() => fetchUsers(pagination.currentPage - 1)}
                          >
                            Précédent
                          </button>
                          <button 
                            className="btn btn-secondary" 
                            disabled={!pagination.next}
                            onClick={() => fetchUsers(pagination.currentPage + 1)}
                          >
                            Suivant
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Button to Trigger Confetti */}
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={triggerConfetti}>
              Celebrate Milestone
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Dashboard;