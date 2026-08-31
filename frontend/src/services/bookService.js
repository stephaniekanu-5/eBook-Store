import API from "./axios";
// =========================
// HELPERS
// =========================
const createFormData = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // Handle File objects properly
    if (value instanceof File) {
      formData.append(key, value);
    }
    // Handle arrays
    else if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    }
    // fallback
    else {
      formData.append(key, value);
    }
  });

  return formData;
};

// =========================
// GET ALL BOOKS
// =========================
export const getBooks = async () => {
  try {
    const response = await API.get("/api/books");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// =========================
// GET SINGLE BOOK
// =========================
export const getBook = async (id) => {
  try {
    const response = await API.get(`/api/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);

    throw error;
  }
};

// =========================
// CREATE BOOK
// =========================
export const createBook = async (formData) => {
  try {
    const response = await API.post("/api/books", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);

    throw error;
  }
};

// =========================
// UPDATE BOOK
// =========================
export const updateBook = async (id, formData) => {
  console.log("SERVICE CALLED");
  try {
    console.log("Sending PUT to:", `/api/books/${id}`);

    const response = await API.put(`/api/books/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("SERVICE RESPONSE:", response);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

// =========================
// DELETE BOOK
// =========================
export const deleteBook = async (id) => {
  try {
    const response = await API.delete(`/api/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};
