import API from "./axios";

export const sendContactMessage = async (data) => {
  const response = await API.post("/api/contact", data);

  return response.data;
};
