import React from "react";
import Restaurants from "./Restaurants";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./Order";

const App: React.FC = () => {
  // ordering from restaurant number: 1 -- state

  return (
    <Router>
      <Routes>
        <Route path="/Order" element={<Order id={1} />} />
        <Route path="/" element={<Restaurants />} />
      </Routes>
    </Router>
  );
};

export default App;
