import React from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";

// Dummy components for each page
const Home = () => <div className="pt-20 px-4">Home Page</div>;
const Pump = () => <div className="pt-20 px-4">Pump Page</div>;
const Transactions = () => <div className="pt-20 px-4">Transactions Page</div>;
const Inventory = () => <div className="pt-20 px-4">Inventory Page</div>;
const FuelPrice = () => <div className="pt-20 px-4">Fuel Price Page</div>;
const Staff = () => <div className="pt-20 px-4">Staff Page</div>;
const Report = () => <div className="pt-20 px-4">Report Page</div>;

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pump" element={<Pump />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/fuel-price" element={<FuelPrice />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
};

export default App;
