import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "./restaurantInterface";
import FoodComponent from "./FoodComponent";

const Order: React.FC<{
  id: number;
  onOrderClick: (spentMoney: number) => void;
}> = ({ id: restaurantId, onOrderClick }) => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/restaurants/") // Django api endpoint
      .then((response) =>
        setRestaurants(
          response.data.filter(
            (restaurant: Restaurant) => restaurant.id === restaurantId
          )
        )
      )
      .catch((error) => console.error(error));
  }, []);

  const handleRestaurantClick = () => {
    onOrderClick(totalPrice);
    navigate("/");
  };

  return (
    <div className="home-page-container">
      <ul>
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            style={{ display: "grid", placeItems: "center" }}
          >
            <h1>{restaurant.name}</h1>
            <h2>Menu</h2>
            {restaurant.food_items.map((food) => (
              <FoodComponent
                key={food.id}
                foodItem={food}
                onAddToOrder={(priceToAdd) =>
                  setTotalPrice(
                    (prevTotalPrice) => prevTotalPrice + Number(priceToAdd)
                  )
                }
              ></FoodComponent>
            ))}
          </div>
        ))}
        <div style={{ display: "grid", placeItems: "center" }}>
          <button
            className="order-button"
            onClick={() => handleRestaurantClick()}
          >
            Order! ${totalPrice.toFixed(2)} €
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Order;
