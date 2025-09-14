import { useState, useEffect } from "react";
import apiRequest from "../../componnent/axios/axiosInstance";
import "./customer.css"

const CustomersByLocation = () => {
  const [locations, setLocations] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomerLocations();
  }, []);

  const fetchCustomerLocations = async () => {
    try {
      setLoading(true);
      const response = await apiRequest.get('/dashboard/customer-locations');
      setLocations(response.data.data.locations || []);
      setSummary(response.data.data.summary || null);
      setError(null);
    } catch (err) {
      setError("Error loading customer locations");
      console.error("Error fetching customer locations:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card shadow-sm border-0 customers-by-location">
        <div className="card-body text-center">
          <h5 className="card-title text-uppercase font-weight-bold">
            Customers By Location
          </h5>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 mb-0">Loading locations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card shadow-sm border-0 customers-by-location">
        <div className="card-body text-center">
          <h5 className="card-title text-uppercase font-weight-bold">
            Customers By Location
          </h5>
          <div className="alert alert-warning">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        </div>
      </div>
    );
  }

  // Prepare data for circular chart
  const topLocations = locations.slice(0, 6);
  const totalTop = topLocations.reduce((sum, l) => sum + Number(l.count || 0), 0) || 1;

  return (
    <div className="card shadow-sm border-0 customers-by-location">
      <div className="card-body">
        <h5 className="card-title text-uppercase font-weight-bold">
          Customers By Location
        </h5>
        <p className="text-muted small mb-3">
          <i className="fas fa-globe me-1"></i>
          Based on registration country selection
        </p>

        {summary && (
          <div className="mb-3 p-2 bg-light rounded">
            <small className="text-muted">
              <strong>Summary:</strong> {summary.customersWithCountry} customers with country data 
              ({summary.customersWithoutCountry} without country)
            </small>
          </div>
        )}

        {locations.length > 0 ? (
          <div className="row align-items-center">
            <div className="col-md-6">
              {/* Circular chart using conic-gradient */}
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: (() => {
                    let start = 0;
                    const colors = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc948'];
                    const segments = topLocations.map((loc, i) => {
                      const pct = (Number(loc.count || 0) / totalTop) * 100;
                      const end = start + pct;
                      const seg = `${colors[i % colors.length]} ${start}% ${end}%`;
                      start = end;
                      return seg;
                    });
                    return `conic-gradient(${segments.join(',')})`;
                  })(),
                  margin: '0 auto',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              />
            </div>
            <div className="col-md-6">
              <ul className="list-unstyled mb-0">
                {topLocations.map((location, index) => (
                  <li key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <span
                        style={{
                          display: 'inline-block',
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          marginRight: 8,
                          backgroundColor: ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc948'][index % 6]
                        }}
                      />
                      <h6 className="mb-0 font-weight-bold">{location.city}</h6>
                    </div>
                    <small className="text-muted">{location.count} ({location.percentage}%)</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted">
            <i className="fas fa-globe fa-2x mb-2"></i>
            <p>No country data available</p>
            <small>Customers need to select their country during registration</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersByLocation;
