import React from "react";
//import { Provider } from "react-redux";
// import { store } from "./store";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider> */}
      <HelmetProvider>
        <App />
      </HelmetProvider>
      {/* </Provider> */}
    </BrowserRouter>
  </React.StrictMode>
);
