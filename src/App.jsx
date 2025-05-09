import React from "react";
import "./app.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import NotFound from "./components/NotFound";
import Prices from "./components/Prices/Prices";
import InventoryPage from "./components/Invetory/Invetory";
import PumpManagement from "./components/Pump/pumpManagement";
import StaffManagement from "./components/Staff/StaffManagement";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/dashboard";
import Navbar from "./components/Navbar/navbar";

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={`pt-16 ${!hideNavbar ? "max-w-7xl mx-auto px-4" : ""}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path="/Prices" element={<PageWrapper><Prices /></PageWrapper>} />
            <Route path="/Inventory" element={<PageWrapper><InventoryPage /></PageWrapper>} />
            <Route path="/Pump" element={<PageWrapper><PumpManagement /></PageWrapper>} />
            <Route path="/Staff" element={<PageWrapper><StaffManagement /></PageWrapper>} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
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
