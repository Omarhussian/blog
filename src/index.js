import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import PopupProvider from "./Context/PopupContext";
import { SnackbarProvider } from "notistack";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
    <Provider store={store}>
      <PopupProvider>
        <App />
      </PopupProvider>
    </Provider>
    </SnackbarProvider>
  </React.StrictMode>
);
