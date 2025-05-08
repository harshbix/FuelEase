import React from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Prices from "./components/Prices/Prices";
import InventoryPage from "./components/Invetory/Invetory";
import PumpManagement from "./components/Pump/pumpManagement";
import StaffManagement from "./components/Staff/StaffManagement";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
        <Route path="/Prices" element={<Prices />} />
        <Route path="/Inventory" element={<InventoryPage /> } />
        <Route path="/Pump" element={<PumpManagement />} />
        <Route path="/Staff" element={<StaffManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
