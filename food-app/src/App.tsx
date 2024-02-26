import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Order from "./Order";
import HomePage from "./HomePage";

const App: React.FC = () => {
  const [orderId, setOrderId] = useState(1);

  return (
    <Router>
      <Routes>
        <Route path="/Order" element={<Order id={orderId} />} />
        <Route path="/" element={<HomePage onRestaurantClick={setOrderId} />} />
      </Routes>
    </Router>
  );
};

export default App;
