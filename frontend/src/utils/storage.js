// =========================
// BOOKS
// =========================
export const getBooks = () => {
  return JSON.parse(localStorage.getItem("books") || "[]");
};

export const saveBooks = (books) => {
  localStorage.setItem("books", JSON.stringify(books));
};

// =========================
// CART
// =========================
export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// =========================
// PURCHASES
// =========================
export const getPurchases = () => {
  return JSON.parse(localStorage.getItem("purchased-books") || "[]");
};

export const savePurchases = (purchases) => {
  localStorage.setItem("purchased-books", JSON.stringify(purchases));
};

// =========================
// USERS
// =========================
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user") || "null");
};

export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
