import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExportToNotion from "./pages/ExportToNotion";
import Header from "./components/Header";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/exportToNotion" element={<ExportToNotion />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
