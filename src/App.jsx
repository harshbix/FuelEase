import React from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./components/NotFound";
import Prices from "./components/Prices/Prices";
import InventoryPage from "./components/Invetory/Invetory";
import PumpManagement from "./components/Pump/pumpManagement";
import StaffManagement from "./components/Staff/StaffManagement";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/dashboard";
import Navbar from "./components/Navbar/navbar"; // <-- Import it

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={`pt-16 ${!hideNavbar ? "max-w-7xl mx-auto px-4" : ""}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Prices" element={<Prices />} />
          <Route path="/Inventory" element={<InventoryPage />} />
          <Route path="/Pump" element={<PumpManagement />} />
          <Route path="/Staff" element={<StaffManagement />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
