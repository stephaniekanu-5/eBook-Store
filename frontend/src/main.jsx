import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { StoreProvider } from "./context/StoreContext";
import { ThemeProvider } from "./context/ThemeContext";
import { BookProvider } from "./context/BookContext";
import { PurchaseProvider } from "./context/PurchaseContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <StoreProvider>
            <ThemeProvider>
              <BookProvider>
                <PurchaseProvider>
                  <App />
                </PurchaseProvider>
              </BookProvider>
            </ThemeProvider>
          </StoreProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
