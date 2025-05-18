import React, { useEffect } from "react";
import "./app.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import NotFound from "./components/NotFound";
import Prices from "./components/Prices/Prices";
import InventoryPage from "./components/Invetory/Invetory";
import PumpManagement from "./components/Pump/pumpManagement";
import StaffManagement from "./components/Staff/StaffManagement";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/dashboard";
import Navbar from "./components/Navbar/navbar";
import PrivateRoute from "./components/privateRoute";
import ReportPage from "./components/report/reportspage";

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

  useEffect(() => {
    const routeTitles = {
      "/": "Dashboard - FuelEase",
      "/Prices": "Prices - FuelEase",
      "/Inventory": "Inventory - FuelEase",
      "/Pump": "Pump Management - FuelEase",
      "/Staff": "Staff Management - FuelEase",
      "/login": "Login - FuelEase",
    };

    document.title = routeTitles[location.pathname] || "Not Found - FuelEase";
  }, [location.pathname]);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={`pt-16 ${!hideNavbar ? "max-w-7xl mx-auto px-4" : ""}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <PageWrapper>
                    <Dashboard />
                  </PageWrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/Prices"
              element={
                <PrivateRoute>
                  <PageWrapper>
                    <Prices />
                  </PageWrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/Inventory"
              element={
                <PrivateRoute>
                  <PageWrapper>
                    <InventoryPage />
                  </PageWrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/Pump"
              element={
                <PrivateRoute>
                  <PageWrapper>
                    <PumpManagement />
                  </PageWrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/Staff"
              element={
                <PrivateRoute>
                  <PageWrapper>
                    <StaffManagement />
                  </PageWrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/Report"
              element={ 
                  <PageWrapper>
                    <ReportPage />
                  </PageWrapper>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <PageWrapper>
                  <NotFound />
                </PageWrapper>
              }
            />
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
