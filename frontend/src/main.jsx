import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import router from "./router/router.jsx";
import { RouterProvider } from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
