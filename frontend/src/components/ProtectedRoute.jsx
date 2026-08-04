import {Navigate, useLocation,} from "react-router-dom";
import {useAuth,} from "../context/AuthContext";

export default function ProtectedRoute({children,}) {
  const {user, loading,} = useAuth();
  const location = useLocation();
  // Loading state
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-black text-white"
      >
        Loading...
      </div>
    );
  }
  // Not authenticated
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, }}
      />
    );
  }

  return children;
}