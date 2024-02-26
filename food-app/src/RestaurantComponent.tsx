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
      <button
        key={restaurant.id}
        onClick={() => onRestaurantClick(restaurant.id)}
        className="restaurant-button"
      >
        <div className="restaurant-image-container">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="restaurant-image"
          />
        </div>
        <div className="restaurant-name">
          <h2 className="restaurant-header">{restaurant.name}</h2>
        </div>
      </button>
    </div>
  );
};

export default RestaurantComponent;
