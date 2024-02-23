import React from "react";

interface RestaurantProps {
  name: string;
  imageUrl: string;
}

const Restaurant: React.FC<RestaurantProps> = ({ name, imageUrl }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={imageUrl}
        style={{ width: "100px", height: "100px", marginRight: "10px" }}
      />
      <div>
        <div>{name}</div>
        <div>Restaurant description here</div>
      </div>
    </div>
  );
};

export default Restaurant;
