import React from "react";

import "./Order.css";

const order = ({ ingredients, price }) => {
  const ingredientsArr = [];

  for (let ingredientName in ingredients) {
    ingredientsArr.push({
      name: ingredientName,
      amount: ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredientsArr.map(ig => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className="Order">
      <p>
        <strong>Ingredients:</strong> {ingredientOutput}
      </p>
      <p>
        <strong>Price:</strong> USD {price.toFixed(2)}
      </p>
    </div>
  );
};

export default order;
