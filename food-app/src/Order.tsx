import { useEffect, useState } from "react";
import axios from "axios";
import { Restaurant } from "./restaurantInterface";
import FoodComponent from "./FoodComponent";

const Order: React.FC<{ id: number }> = ({ id: restaurantId }) => {
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

  return (
    <div>
      <ul>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id}>
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
          <button style={{ marginTop: "50px" }}>
            Order! ${totalPrice.toFixed(2)} Euro
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Order;
