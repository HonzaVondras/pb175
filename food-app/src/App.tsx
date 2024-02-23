import { useState } from "react";
import Restaurant from "./restaurant";

function App() {
  const restaurants = [
    <Restaurant
      key={1}
      name="Rybarska basta"
      imageUrl="https://plus.unsplash.com/premium_photo-1674498271296-5144c596b43c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmlzaCUyMGZvb2R8ZW58MHx8MHx8fDA%3D"
    />,
    <Restaurant
      key={2}
      name="Pizza"
      imageUrl="https://plus.unsplash.com/premium_photo-1673439304183-8840bd0dc1bf?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />,
    <Restaurant
      key={3}
      name="Burgers"
      imageUrl="https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyfGVufDB8fDB8fHww"
    />,
  ];

  const [searchedName, setSearchedName] = useState("");

  const filterRestaurants = () => {
    return restaurants.filter((restaurant) =>
      restaurant.props.name.toLowerCase().includes(searchedName.toLowerCase())
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
        <div key={restaurant.key} style={{ marginBottom: "10px" }}>
          {restaurant}
        </div>
      ))}
    </div>
  );
}

export default App;
