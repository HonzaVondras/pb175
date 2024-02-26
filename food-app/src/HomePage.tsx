import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "./restaurantInterface";
import RestaurantComponent from "./RestaurantComponent";

const HomePage: React.FC<{ onRestaurantClick: (id: number) => void }> = ({
  onRestaurantClick,
}) => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchedName, setSearchedName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/restaurants/") // Django api endpoint
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error(error));
  }, []);

  const filterRestaurants = () => {
    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchedName.toLowerCase())
    );
  };

  const handleRestaurantClick = (id: number) => {
    onRestaurantClick(id);
    navigate("/Order");
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
        <RestaurantComponent
          key={restaurant.id}
          restaurant={restaurant}
          onRestaurantClick={handleRestaurantClick}
        />
      ))}
    </div>
  );
};

export default HomePage;
