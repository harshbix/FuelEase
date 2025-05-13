import React, { useState } from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Prices from "./components/Prices/Prices";
import InventoryPage from "./components/Invetory/Invetory";
import PumpManagement from "./components/Pump/pumpManagement";
import StaffManagement from "./components/Staff/StaffManagement";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/dashboard";
import ReportPage from "./components/report page/components/ReportPage";
import { reportsData } from "./components/report page/data/reportsData";

const AppWithReportPage = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  return (
    <Router>
      <Routes>
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
        <Route 
          path="/" 
          element={<ReportPage data={reportsData} dateRange={dateRange} setDateRange={setDateRange} />} 
        />
        <Route 
          path="/reportpage" 
          element={<ReportPage data={reportsData} dateRange={dateRange} setDateRange={setDateRange} />} 
        />
        <Route path="/Prices" element={<Prices />} />
        <Route path="/Inventory" element={<InventoryPage /> } />
        <Route path="/Pump" element={<PumpManagement />} />
        <Route path="/Staff" element={<StaffManagement />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppWithReportPage;
