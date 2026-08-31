import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  getProfile,
  logoutUser,
} from "../services/authService";
// =========================
// CONTEXT
// =========================
const AuthContext = createContext(null);
// =========================
// PROVIDER
// =========================
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  // =========================
  // LOAD AUTH USER
  // =========================
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        // No token
        if (!token) {
          setLoading(false);
          return;
        }

        // Fetch user profile
        const data = await getProfile();

        setUser(data.user);
      } catch (error) {
        console.error("Auth initialization failed:", error);

        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
        }

        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  // =========================
  // LOGIN
  // =========================
  const login = async (email, password) => {
    try {
      setLoading(true);

      const data = await loginUser({
        email,
        password,
      });

      setUser(data.user);

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,

        message: error?.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // REGISTER
  // =========================
  const register = async (name, email, password) => {
    try {
      setLoading(true);

      const data = await registerUser({
        name,
        email,
        password,
      });

      setUser(data.user);

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,

        message: error?.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }

    localStorage.removeItem("token");
    setUser(null);
  };

  // =========================
  // VALUES
  // =========================
  const value = {
    user,

    loading,

    login,

    register,

    logout,

    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// =========================
// CUSTOM HOOK
// =========================
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
