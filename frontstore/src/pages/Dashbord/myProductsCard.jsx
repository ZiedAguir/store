import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyProductsCard = ({ count, products, loading, error }) => {
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="card card-modern">
        <div className="card-body p-4 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 mb-0">Loading your products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card card-modern">
        <div className="card-body p-4 text-center">
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-modern">
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h5 className="card-title mb-1">Mes Produits Postés</h5>
            <p className="card-subtitle text-muted mb-0">
              Nombre total de produits que vous avez créés
            </p>
          </div>
          <div className="text-end">
            <div className="display-4 text-primary fw-bold">{count}</div>
            <small className="text-muted">Produits</small>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-sm btn-outline-primary" onClick={() => navigate('/my-products-status')}>
            Voir tous mes produits
          </button>
        </div>
        
        {count > 0 && (
          <div className="mt-3">
            <h6 className="mb-2">Produit Récent :</h6>
            <div className="list-group list-group-flush">
              {products.slice(0, 1).map((product, index) => (
                <div key={product._id} className="list-group-item d-flex align-items-center p-2 border-0">
                  <div className="flex-shrink-0 me-3">
                    {product.imageCover ? (
                      <img 
                        src={product.imageCover} 
                        alt={product.title}
                        className="rounded"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div 
                        className="rounded d-flex align-items-center justify-content-center"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: '#f8f9fa',
                          color: '#6c757d'
                        }}
                      >
                        <i className="fas fa-image"></i>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-0" style={{ fontSize: '0.9rem' }}>
                      {product.title}
                    </h6>
                    <small className="text-muted">
                      ${product.price} • {new Date(product.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>
            {products.length > 3 && (
              <div className="text-center mt-2">
                <small className="text-muted">
                  Et {products.length - 3} autres produits...
                </small>
              </div>
            )}
          </div>
        )}
        
        {count === 0 && (
          <div className="text-center py-3">
            <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
            <p className="text-muted mb-0">
              Vous n'avez pas encore créé de produits.
            </p>
            <small className="text-muted">
              Commencez par ajouter votre premier produit !
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProductsCard;
