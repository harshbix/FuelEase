import React from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Prices from "./components/Prices/Prices";
import InventoryPage from "./components/Invetory/Invetory";
import PumpManagement from "./components/Pump/pumpManagement";
import StaffManagement from "./components/Staff/StaffManagement";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/dashboard";
import ReportPage from "./components/report/reportspage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/Prices" element={<Prices />} />
        <Route path="/Inventory" element={<InventoryPage /> } />
        <Route path="/Pump" element={<PumpManagement />} />
        <Route path="/Staff" element={<StaffManagement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </Router>
  );
};

export default App;
