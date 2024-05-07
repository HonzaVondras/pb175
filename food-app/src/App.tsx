import React, { useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Order from "./Order";
import HomePage from "./HomePage";
import "./styles.css";
import LoginRegistration from "./LoginRegistration";
import PersonalDataPage from "./PersonalData";
import RestaurantEdit from "./RestaurantEdit";
import { Restaurant } from "./restaurantInterface";
import OrderEdit from "./OrderEdit";
import { FoodItem } from "./foodItemInterface";



const resta: Restaurant = {
  id: 1,
  name: "Sample Restaurant",
  image: "restaurant-image-url.jpg",
  food_items: [],
};

const foodd: FoodItem = {
  id: 1,
  name: "Sample Restaurant",
  image: "restaurant-image-url.jpg",
  price: 10.0,
};


const App: React.FC = () => {
  useLayoutEffect(() => {}, []);

  const [orderId, setOrderId] = useState(1);
  const [spentMoney, setSpentMoney] = useState(0);
  const [restaurant, setRestaurant]  = useState(resta);
  const [food, setfood]  = useState(foodd);

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
              onEditClick={setfood}
            />
          }
        />
        <Route
          path="/"
          element={
            <HomePage paidMoney={spentMoney} onRestaurantClick={setOrderId} onEdit={setRestaurant} />
          }
        />
        <Route path="/login" element={<LoginRegistration />} />
        <Route path="/personal-page" element={<PersonalDataPage />} />
        <Route path="/restaurant-edit" element={<RestaurantEdit restaurant={restaurant}/>} />
        <Route path="/order-edit" element={<OrderEdit food={food}/>} />  
      </Routes>
    </Router>
  );
};

export default App;
