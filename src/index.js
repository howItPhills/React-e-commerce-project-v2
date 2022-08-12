import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";
import { ShopProvider } from "./contexts/ShopContext";
import { CartProvider } from "./contexts/CartContext";
import { Provider } from "react-redux";

import "./index.css";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <UserProvider> */}
        <ShopProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ShopProvider>
        {/* </UserProvider> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
