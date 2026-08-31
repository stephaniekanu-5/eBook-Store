import API from "./axios";

// =========================
// SAVE TOKEN
// =========================
const saveToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

// =========================
// REGISTER
// =========================
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/api/auth/register", userData);

    saveToken(response.data?.token);

    return response.data;
  } catch (error) {
    console.error(
      "Registration Error:",
      error?.response?.data || error.message,
    );

    throw error;
  }
};

// =========================
// LOGIN
// =========================
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/api/auth/login", userData);

    saveToken(response.data?.token);

    return response.data;
  } catch (error) {
    console.error("Login Error:", error?.response?.data || error.message);

    throw error;
  }
};

// =========================
// GET PROFILE
// =========================
export const getProfile = async () => {
  try {
    const response = await API.get("/api/auth/profile");
    return response.data;
  } catch (error) {
    console.error("Profile Error:", error?.response?.data || error.message);

    throw error;
  }
};

// =========================
// LOGOUT
// =========================
export const logoutUser = async () => {
  try {
    const response = await API.post("/api/auth/logout");

    localStorage.removeItem("token");

    return response.data;
  } catch (error) {
    console.error("Logout Error:", error?.response?.data || error.message);

    localStorage.removeItem("token");

    throw error;
  }
};

// =========================
// SEND RECEIPT EMAIL
// =========================
export const sendReceiptEmail = async (emailData) => {
  try {
    const response = await API.post("/api/auth/send-receipt", emailData);

    return response.data;
  } catch (error) {
    console.error(
      "Receipt Email Error:",
      error?.response?.data || error.message,
    );

    throw error;
  }
};
