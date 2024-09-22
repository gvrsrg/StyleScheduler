import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ isAuth=false, children }) {
    let location = useLocation();
    if (!isAuth) {
      // Redirect to the /login page
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }