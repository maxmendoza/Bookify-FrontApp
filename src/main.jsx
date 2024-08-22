import React, { useEffect } from "react";
import { CssBaseline } from "@mui/material";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "swiper/swiper-bundle.css";

import { BrowserRouter } from "react-router-dom";

import "./index.css";
import { AuthProvider } from "./AuthContext.jsx";

const Main = () => {
  useEffect(() => {
    document.title = "BOOKIFY";
  }, []);

  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>
);
