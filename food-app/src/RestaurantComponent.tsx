import React from "react";
import { Restaurant } from "./restaurantInterface";
import "./styles.css";

interface RestaurantProps {
  restaurant: Restaurant;
  onRestaurantClick: (id: number) => void;
}

const RestaurantComponent: React.FC<RestaurantProps> = ({
  restaurant,
  onRestaurantClick,
}) => {
  return (
    <div className="restaurant-container">
      <h2 className="restaurant-header">{restaurant.name}</h2>
      <button
        key={restaurant.id}
        onClick={() => onRestaurantClick(restaurant.id)}
        className="restaurant-button"
      >
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-image"
        />
        <div>{restaurant.name}</div>
        <ul>
          {restaurant.food_items.map((foodItem) => (
            <li key={foodItem.id}>{foodItem.name}</li>
          ))}
        </ul>
      </button>
    </div>
  );
};

export default RestaurantComponent;
