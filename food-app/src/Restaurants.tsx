import { useEffect, useState } from "react";
import axios from "axios";
import { Restaurant } from "./restaurantInterface";
import { useNavigate } from "react-router-dom";

const Restaurants: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/restaurants/") // Django api endpoint
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error(error));
  }, []);

  const [searchedName, setSearchedName] = useState("");

  const filterRestaurants = () => {
    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchedName.toLowerCase())
    );
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    navigate("/Order");
    //navigate(`/Order/${restaurant.id}`);
  };

  return (
    <div>
      <div style={{ display: "grid", placeItems: "center" }}>
        <h1>Restaurants</h1>
        <label>
          <input
            type="text"
            placeholder="Search for restaurants"
            value={searchedName}
            onChange={(e) => setSearchedName(e.target.value)}
          ></input>
        </label>
      </div>
      {filterRestaurants().map((restaurant) => (
        <button
          key={restaurant.id}
          onClick={() => handleRestaurantClick(restaurant)}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          <img
            src={restaurant.image}
            alt={restaurant.name}
            style={{ width: "100px", height: "100px", marginRight: "10px" }}
          />
          <div>{restaurant.name}</div>
          <ul>
            {restaurant.food_items.map((foodItem) => (
              <li key={foodItem.id}>{foodItem.name}</li>
            ))}
          </ul>
        </button>
      ))}
    </div>
  );
};

export default Restaurants;
