import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Utilisez AuthContext

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const verifyAuthorization = async () => {
      try {
        // Vérifier si l'utilisateur est connecté
        if (!user) {
          navigate('/homepage');
          return;
        }

        // Vérifier les rôles
        let hasRequiredRole = true;
        if (requiredRole) {
          hasRequiredRole = user.role === requiredRole || user.role === 'superadmin';
        } else {
          hasRequiredRole = user.role === 'admin' || user.role === 'superadmin';
        }

        if (hasRequiredRole) {
          setIsAuthorized(true);
        } else {
          navigate('/homepage');
        }
      } catch (error) {
        console.error("Erreur de vérification d'autorisation:", error);
        navigate('/homepage');
      } finally {
        setLoading(false);
      }
    };

    verifyAuthorization();
  }, [navigate, requiredRole, user, logout]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Chargement...</span>
        </div>
      </div>
    );
  }

  return isAuthorized ? children : null;
};

export default ProtectedRoute;