import React, { useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Order from "./Order";
import HomePage from "./HomePage";
import "./styles.css";

const App: React.FC = () => {
  useLayoutEffect(() => {}, []);

  const [orderId, setOrderId] = useState(1);
  const [spentMoney, setSpentMoney] = useState(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/order"
          element={
            <Order
              id={orderId}
              onOrderClick={(addSpentMoney) =>
                setSpentMoney(addSpentMoney + spentMoney)
              }
            />
          }
        />
        <Route
          path="/"
          element={
            <HomePage paidMoney={spentMoney} onRestaurantClick={setOrderId} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
