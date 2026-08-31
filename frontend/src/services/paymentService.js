export const verifyPayment = async (paymentData) => {
  try {
    const response = await API.post("/api/payments/verify", paymentData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    throw error;
  }
};
