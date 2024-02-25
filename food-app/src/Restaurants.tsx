import { useEffect, useState } from "react";
import axios from "axios";

interface Restaurant {
  id: number;
  name: string;
  image: string;
}

const Restaurants: React.FC = () => {
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
        <div
          key={restaurant.id}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={restaurant.image}
            alt={restaurant.name}
            style={{ width: "100px", height: "100px", marginRight: "10px" }}
          />
          <div>{restaurant.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Restaurants;
