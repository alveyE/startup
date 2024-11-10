import React from "react";
import "../main.css";
import { Link } from "react-router-dom";

export function Product({ product }) {
  const { name, imgSrc, prices } = product;

  const { store, price } = Object.entries(prices).reduce(
    (cheapest, [store, price]) =>
      price < cheapest.price ? { store, price } : cheapest,
    { store: null, price: Infinity }
  );

  const [addedToList, setAddedToList] = React.useState(false);

  return (
    <div className="grid-item">
      <img src={imgSrc} alt={name} />
      <div>
        <h2>
          <Link to={`/product`}>{name}</Link>
        </h2>
        <p style={{ fontSize: "larger" }}>{price}</p>
        <p style={{ fontSize: "larger" }}>{store}</p>
        <button className="button" onClick={() => setAddedToList(!addedToList)}>
          {addedToList ? "Remove from my list" : "Add to my list"}
        </button>
      </div>
    </div>
  );
}

export function SaleProduct({ name, originalPrice, salePrice, store, imgSrc }) {
  const [addedToList, setAddedToList] = React.useState(false);

  return (
    <div>
      <img src={imgSrc} width="300" height="300" />
      <div>
        <h2>
          <a href={`product`}>{name}</a>
        </h2>{" "}
        <p>
          <s>${originalPrice}</s> ${salePrice}
        </p>
        <p>On sale at {store} until 10/31</p>
        <button className="button" onClick={() => setAddedToList(!addedToList)}>
          {addedToList ? "Remove from my list" : "Add to my list"}
        </button>
      </div>
    </div>
  );
}

export function ListProduct({ product }) {
  const { name, imgSrc, prices } = product;

  const { store, price } = Object.entries(prices).reduce(
    (cheapest, [store, price]) =>
      price < cheapest.price ? { store, price } : cheapest,
    { store: null, price: Infinity }
  );

  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="item">
      <img src={imgSrc} />
      <div>
        <h2>
          <a href={`product`}>{name}</a>
        </h2>{" "}
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

export function ProductOverview({ product }) {
  const { name, imgSrc, prices } = product;
  const [addedToList, setAddedToList] = React.useState(false);

  if (!prices) {
    return <h2>Product not found</h2>;
  }

  const cheapestStore = Object.entries(prices).reduce(
    (cheapest, [store, price]) =>
      price < cheapest.price ? { store, price } : cheapest,
    { store: null, price: Infinity }
  );

  return (
    <div className="product-container">
      <img src={imgSrc} alt={name} />
      <div className="product-details">
        <h2>{name}</h2>
        <ul>
          {Object.entries(prices).map(([store, price]) => (
            <li key={store}>
              {store}: ${price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p style={{ fontSize: "1.5em" }}>
          <strong>Cheapest - {cheapestStore.store}</strong>
        </p>
        <button className="button" onClick={() => setAddedToList(!addedToList)}>
          {addedToList ? "Remove from my list" : "Add to my list"}
        </button>{" "}
      </div>
    </div>
  );
}
