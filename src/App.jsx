import React from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Prices from "./components/Prices/Prices";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
        <Route path="/Prices" element={<Prices />} />
      </Routes>
    </Router>
  );
};

export default App;
