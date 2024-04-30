import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FoodComponent from "../FoodComponent";

test("check there cant be negative price", () => {
  const onAddToOrder = jest.fn();
  const foodItem = {
    id: 1,
    name: "Test Food",
    price: 10,
    image: "test_image.png"
  };
  const { getByText } = render(<FoodComponent foodItem={foodItem} onAddToOrder={onAddToOrder} />);
  
  const addButton = getByText("+");
  const decrementButton = getByText("-");
  
  fireEvent.click(decrementButton);

  fireEvent.click(addButton);

  fireEvent.click(decrementButton);
  fireEvent.click(decrementButton);

  const totalPricePassedToOnAddToOrder = onAddToOrder.mock.calls.reduce((acc, args) => acc + args[0], 0);

  expect(totalPricePassedToOnAddToOrder).toBe(0);
});

test("check final price after adding and subtracting food items", () => {
  const onAddToOrder = jest.fn();
  const foodItem = {
    id: 1,
    name: "Test Food",
    price: 10,
    image: "test_image.png"
  };
  const { getByText } = render(<FoodComponent foodItem={foodItem} onAddToOrder={onAddToOrder} />);
  
  const addButton = getByText("+");
  const decrementButton = getByText("-");
  
  fireEvent.click(addButton);
  fireEvent.click(addButton);
  fireEvent.click(addButton);
  fireEvent.click(addButton);
  fireEvent.click(addButton);
  
  fireEvent.click(decrementButton);
  fireEvent.click(decrementButton);
  
  const expectedFinalPrice = 3 * foodItem.price; // added 5, removed 2

  const totalPricePassedToOnAddToOrder = onAddToOrder.mock.calls.reduce((acc, args) => acc + args[0], 0);

  expect(totalPricePassedToOnAddToOrder).toBe(expectedFinalPrice);
});

test("limit large amount of food items", () => {
  const onAddToOrder = jest.fn();
  const foodItem = {
    id: 1,
    name: "Test Food",
    price: 10,
    image: "test_image.png"
  };
  const { getByText } = render(<FoodComponent foodItem={foodItem} onAddToOrder={onAddToOrder} />);
  
  const addButton = getByText("+");

  for (let i = 0; i < 1000; i++) {
    fireEvent.click(addButton);
  }

  expect(onAddToOrder).not.toHaveBeenCalledTimes(1000);
});

test("check add order functionality", () => {
  const onAddToOrder = jest.fn();
  const foodItem = {
    id: 1,
    name: "Test Food",
    price: 50,
    image: "test_image.png"
  };

  const { getByText } = render(<FoodComponent foodItem={foodItem} onAddToOrder={onAddToOrder} />);
  const addButton = getByText("+");
  fireEvent.click(addButton);
  
  expect(onAddToOrder).toHaveBeenCalledWith(foodItem.price);
});
