import React from "react";
import "../main.css";

export function ListProduct({ name, price, store, imgSrc }) {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="item">
      <img src={imgSrc} />
      <div>
        <h2>{name}</h2>
        <p>{price}</p>
        <p>Cheapest - {store}</p>
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
    </div>
  );
}
