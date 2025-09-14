
import { useContext, useEffect, useState } from "react";
import Header from "../../componnent/Header/headerprofil";
import SideBar from "../../componnent/SideBare/sideBare";
import { FormContext } from "../../componnent/context/AuthContext";
import apiRequest from "../../componnent/axios/axiosInstance";
import InfoProfil from "./ComponentsUserProfil/infoProfil";
import ListFriends from "./ComponentsUserProfil/listFriends";
import LanguageUser from "./ComponentsUserProfil/languageUser";
import UsersReviews from "./ComponentsUserProfil/usersReviews";
import PersonalInformation from "./ComponentsUserProfil/personalInformation";
import TotalSales from "./ComponentsUserProfil/totalSales";
import NewCustomers from "./ComponentsUserProfil/newCustomers";
import NumberOfOrderes from "./ComponentsUserProfil/numberOfOrders";
import UpdateProjects from "./ComponentsUserProfil/updateProjects";
import Messages from "./ComponentsUserProfil/messages";

function UserProfil() {
    const { currentUser,setCustomizationSettings} = useContext(FormContext);
    const [reports, setReports] = useState([]);
    const [reportsLoading, setReportsLoading] = useState(false);
    useEffect(() => {
      const fetchCustomizationSettings = async () => {
        try {
          const userId = currentUser?.data?._id;
          const response = await apiRequest.get(`/customization/get-customise/${userId}`);
    
          if (response.status === 200 && response.data?.data) {    
            localStorage.setItem("customizationSettings", JSON.stringify(response.data.data));
            setCustomizationSettings(response.data.data);
          } 
        } catch (error) {
          console.log(error);
              const localSettings = localStorage.getItem("customizationSettings");
          if (localSettings) {
            setCustomizationSettings(JSON.parse(localSettings));
          }
        }
      };
    
      if (currentUser?.data?._id) {
        fetchCustomizationSettings();
      }
    }, [currentUser]);

    useEffect(() => {
      const loadReports = async () => {
        try {
          setReportsLoading(true);
          let url = '/reports/mine';
          // Admin/superadmin could choose to see all, but per request show own signals here
          const res = await apiRequest.get(url);
          const list = res.data?.data || [];
          setReports(list.slice(0, 2));
        } catch (e) {
          // silent fail
        } finally {
          setReportsLoading(false);
        }
      };
      loadReports();
    }, [currentUser]);
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
        <section role="main" className="content-body">
          <header className="page-header">
            <h2>User Profile</h2>
            <div className="right-wrapper text-end">
              <ol className="breadcrumbs">
                <li>
                  <a href="/">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li>
                  <span>Pages</span>
                </li>
                <li>
                  <span>User Profile</span>
                </li>
              </ol>
              <a className="sidebar-right-toggle" data-open="sidebar-right">
                <i className="fas fa-chevron-left" />
              </a>
            </div>
          </header>
          {/* start: page */}
          <div className="row">
            <div className="col-lg-4 col-xl-3 mb-4 mb-xl-0">
              <InfoProfil/>
             <ListFriends/>
              <LanguageUser/>;
            </div>
            <div className="col-lg-8 col-xl-6">
              <div className="tabs">
                <ul className="nav nav-tabs tabs-primary">
                  <li className="nav-item active">
                    <button
                      className="nav-link"
                      data-bs-target="#overview"
                      data-bs-toggle="tab"
                    >
                      Overview
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-target="#edit"
                      data-bs-toggle="tab"
                    >
                      Edit
                    </button>
                  </li>
                </ul>
                <div className="tab-content">
                  <UsersReviews/>
                  <PersonalInformation/>
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <h4 className="mb-3 mt-0 font-weight-semibold text-dark">Signals</h4>
                <div className="card card-modern">
                  <div className="card-body p-3">
                    {reportsLoading ? (
                      <div className="text-muted small">Loading...</div>
                    ) : reports.length === 0 ? (
                      <div className="text-muted small">No signals.</div>
                    ) : (
                      <ul className="list-unstyled mb-2">
                        {reports.map((r) => (
                          <li key={r._id} className="mb-2">
                            <div className="d-flex justify-content-between">
                              <span className="text-dark" style={{maxWidth:'70%',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.product?.title || 'Product'}</span>
                              <small className="text-muted">{r.status === 'resolved' ? 'Resolved' : 'Open'} • {new Date(r.createdAt).toLocaleDateString()}</small>
                            </div>
                            <small className="text-muted">{r.reason}</small>
                          </li>
                        ))}
                      </ul>
                    )}
                    {(currentUser?.data?.role === 'admin' || currentUser?.data?.role === 'superadmin') ? (
                      <a href="/admin/reports" className="btn btn-sm btn-outline-primary">View all</a>
                    ) : (
                      <a href="/my-reports" className="btn btn-sm btn-outline-primary">View all</a>
                    )}
                  </div>
                </div>
            </div>
          </div>
          {/* end: page */}
        </section>
      </div>
    </section>
  );
}

export default UserProfil;
