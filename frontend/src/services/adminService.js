import API from "./axios";

export const getStats = async () => {
  const response = await API.get("/api/admin/stats");

  return response.data;
};
