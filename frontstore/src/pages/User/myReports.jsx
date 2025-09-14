import { useEffect, useState, useContext } from "react";
import Header from "../../componnent/Header/headerprofil";
import SideBar from "../../componnent/SideBare/sideBare";
import apiRequest from "../../componnent/axios/axiosInstance";
import { FormContext } from "../../componnent/context/AuthContext";

function MyReportsPage() {
  const { currentUser } = useContext(FormContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await apiRequest.get('/reports/mine');
        setReports(res.data?.data || []);
      } catch (e) {
        setError(e?.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (!currentUser) return <div className="p-3">Please login.</div>;

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
            <h2 className="font-weight-bold text-6">My Signals</h2>
            <div className="right-wrapper">
              <ol className="breadcrumbs">
                <li><span>Home</span></li>
                <li><span>Profile</span></li>
                <li><span>My Signals</span></li>
              </ol>
              <button className="checkout-back btn btn-light btn-sm ms-2" onClick={() => window.history.back()} title="Retour">
                <i className="fas fa-arrow-left" />
              </button>
            </div>
          </header>

          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Your Reports</h4>
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
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((r) => (
                        <tr key={r._id}>
                          <td style={{ maxWidth: 240 }}>
                            <div className="d-flex align-items-center gap-2">
                              {r.product?.imageCover && (
                                <img src={r.product.imageCover} alt="prod" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6 }} />
                              )}
                              <span className="text-truncate">{r.product?.title || 'Product'}</span>
                            </div>
                          </td>
                          <td style={{ maxWidth: 320 }} className="text-truncate">{r.reason}</td>
                          <td><span className={`badge ${r.status === 'open' ? 'badge-warning' : 'badge-success'}`}>{r.status}</span></td>
                          <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                      {reports.length === 0 && (
                        <tr><td colSpan={4} className="text-center">No reports submitted.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default MyReportsPage;


