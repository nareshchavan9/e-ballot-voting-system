
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UseAuthOptions {
  requireAdmin?: boolean;
  redirectTo?: string;
}

export const useAuth = (options: UseAuthOptions = {}) => {
  const { requireAdmin = false, redirectTo = '/login' } = options;
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem("isAuthenticated");
        const userRole = localStorage.getItem("userRole");
        
        const isAuth = authStatus === "true";
        const admin = userRole === "admin";
        
        setIsAuthenticated(isAuth);
        setIsAdmin(admin);
        
        if (!isAuth && window.location.pathname !== redirectTo && window.location.pathname !== "/register") {
          navigate(redirectTo);
        } else if (requireAdmin && !admin && isAuth) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, redirectTo, requireAdmin]);

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate("/login");
  };

  return { isAuthenticated, isAdmin, isLoading, logout };
};
