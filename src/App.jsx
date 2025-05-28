import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";

import NotFound from "./components/NotFound";
import Prices from "./components/Prices/Prices";
import InventoryPage from "./components/Invetory/Invetory";
import PumpManagement from "./components/Pump/pumpManagement";
import StaffManagement from "./components/Staff/StaffManagement";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/dashboard";
import Navbar from "./components/Navbar/navbar";

// Page wrapper for animation
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

// Root route
const rootRoute = createRootRoute({
  component: () => <RouterProvider router={router} />,
});

// Define routes
const dashboardRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: () => (
    <PageWrapper>
      <Dashboard />
    </PageWrapper>
  ),
});

const pricesRoute = createRoute({
  path: "/Prices",
  getParentRoute: () => rootRoute,
  component: () => (
    <PageWrapper>
      <Prices />
    </PageWrapper>
  ),
});

const inventoryRoute = createRoute({
  path: "/Inventory",
  getParentRoute: () => rootRoute,
  component: () => (
    <PageWrapper>
      <InventoryPage />
    </PageWrapper>
  ),
});

const pumpRoute = createRoute({
  path: "/Pump",
  getParentRoute: () => rootRoute,
  component: () => (
    <PageWrapper>
      <PumpManagement />
    </PageWrapper>
  ),
});

const staffRoute = createRoute({
  path: "/Staff",
  getParentRoute: () => rootRoute,
  component: () => (
    <PageWrapper>
      <StaffManagement />
    </PageWrapper>
  ),
});

const loginRoute = createRoute({
  path: "/login",
  getParentRoute: () => rootRoute,
  component: Login,
});

const registerRoute = createRoute({
  path: "/register",
  getParentRoute: () => rootRoute,
  component: Register,
});

const notFoundRoute = createRoute({
  path: "*",
  getParentRoute: () => rootRoute,
  component: () => (
    <PageWrapper>
      <NotFound />
    </PageWrapper>
  ),
});

// Create route tree with all routes
const routeTree = rootRoute.addChildren([
  dashboardRoute,
  pricesRoute,
  inventoryRoute,
  pumpRoute,
  staffRoute,
  loginRoute,
  registerRoute,
  notFoundRoute,
]);

// Create router instance
const router = createRouter({
  routeTree,
});

// App content component with navbar toggle and title update
const AppContent = () => {
  const { currentRoute } = router.useRouter();

  // Hide navbar on login and register pages
  const hideNavbar =
    currentRoute.id === loginRoute.id || currentRoute.id === registerRoute.id;

  // Update document title based on route path
  useEffect(() => {
    const routeTitles = {
      "/": "Dashboard - FuelEase",
      "/Prices": "Prices - FuelEase",
      "/Inventory": "Inventory - FuelEase",
      "/Pump": "Pump Management - FuelEase",
      "/Staff": "Staff Management - FuelEase",
      "/login": "Login - FuelEase",
      "/register": "Register - FuelEase",
    };

    document.title = routeTitles[currentRoute.path] || "Not Found - FuelEase";
  }, [currentRoute.path]);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={`pt-16 ${!hideNavbar ? "max-w-7xl mx-auto px-4" : ""}`}>
        <AnimatePresence mode="wait">{currentRoute.render()}</AnimatePresence>
      </div>
    </>
  );
};

// Main App exports router provider with AppContent
function App() {
  return <RouterProvider router={router} fallbackElement={<div>Loading...</div>}>
    <AppContent />
  </RouterProvider>;
}

export default App;
