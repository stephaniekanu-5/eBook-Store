import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-black
          text-white
        "
      >
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
