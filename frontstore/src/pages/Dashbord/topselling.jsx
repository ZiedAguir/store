
import { useState, useEffect } from "react";
import apiRequest from "../../componnent/axios/axiosInstance";

const TopSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopSellingProducts();
  }, []);

  const fetchTopSellingProducts = async () => {
    try {
      setLoading(true);
      const response = await apiRequest.get('/dashboard/top-selling');
      setProducts(response.data.data);
      setError(null);
    } catch (err) {
      setError("Error loading top selling products");
      console.error("Error fetching top selling products:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Top Selling Products</h4>
        </div>
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 mb-0">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Top Selling Products</h4>
        </div>
        <div className="card-body text-center">
          <div className="alert alert-warning">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        </div>
      </div>
    );
  }

  // Prepare histogram data
  const top = products.slice(0, 5);
  const maxValue = Math.max(...top.map(p => Number(p.totalSold || p.ratingsQuantity || 0)), 1);

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Top Selling Products</h4>
      </div>
      <div className="card-body">
        {top.length > 0 ? (
          <div>
            {top.map((product, index) => {
              const value = Number(product.totalSold || product.ratingsQuantity || 0);
              const pct = Math.round((value / maxValue) * 100);
              return (
                <div key={product._id || index} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 className="mb-0" style={{ maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.title}</h6>
                    <small className="text-muted">{value} {product.totalSold ? 'sold' : 'reviews'}</small>
                  </div>
                  <div className="progress" style={{ height: '10px', backgroundColor: '#f1f3f5' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${pct}%`, backgroundColor: ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f'][index % 5] }}
                      aria-valuenow={pct}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                  <small className="text-muted">
                    {product.totalSold ? `Revenue: $${Number(product.totalRevenue || 0).toFixed(2)}` : `Rating: ${Number(product.ratingsAverage || 0).toFixed(1)}`}
                  </small>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-muted">
            <i className="fas fa-box-open fa-2x mb-2"></i>
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopSellingProducts;
