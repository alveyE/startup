import React from "react";
import "../main.css";
import { useNavigate } from "react-router-dom";

export function Product({ product }) {
  const { name, imgSrc, prices } = product;
  const navigate = useNavigate();

  console.log(prices);
  const { store, price } = prices.reduce(
    (cheapest, current) => {
      const currentPrice = parseFloat(current.price);
      const cheapestPrice = parseFloat(cheapest.price);
      return currentPrice < cheapestPrice ? current : cheapest;
    },
    { store: null, price: Infinity }
  );

  const [addedToList, setAddedToList] = React.useState(false);

  function handleProductClick() {
    navigate("/product", { state: { product } });
  }

  return (
    <div
      className="grid-item"
      onClick={handleProductClick}
      style={{ cursor: "pointer" }}
    >
      <img src={imgSrc} alt={name} />
      <div>
        <h2>{name}</h2>
        <p style={{ fontSize: "larger" }}>${price}</p>
        <p style={{ fontSize: "larger" }}>{store}</p>
        <button
          className="button"
          onClick={(e) => {
            e.stopPropagation();
            setAddedToList(!addedToList);
          }}
        >
          {addedToList ? "Remove from my list" : "Add to my list"}
        </button>
      </div>
    </div>
  );
}

export function SaleProduct({ product, originalPrice, salePrice, store }) {
  const [addedToList, setAddedToList] = React.useState(false);
  const navigate = useNavigate();

  const { name, imgSrc } = product;

  function handleProductClick() {
    navigate("/product", { state: { product } });
  }

  return (
    <div onClick={handleProductClick} style={{ cursor: "pointer" }}>
      <img src={imgSrc} width="300" height="300" />
      <div>
        <h2>{name}</h2>
        <p>
          <s>${originalPrice}</s> ${salePrice}
        </p>
        <p>On sale at {store} until 10/31</p>
        <button
          className="button"
          onClick={(e) => {
            e.stopPropagation();
            setAddedToList(!addedToList);
          }}
        >
          {addedToList ? "Remove from my list" : "Add to my list"}
        </button>
      </div>
    </div>
  );
}

export function ListProduct({ product }) {
  const navigate = useNavigate();

  const { name, imgSrc, prices } = product;

  const { store, price } = Object.entries(prices).reduce(
    (cheapest, [store, price]) =>
      price < cheapest.price ? { store, price } : cheapest,
    { store: null, price: Infinity }
  );

  const [quantity, setQuantity] = React.useState(1);

  function handleProductClick() {
    navigate("/product", { state: { product } });
  }

  return (
    <div
      className="item"
      onClick={handleProductClick}
      style={{ cursor: "pointer" }}
    >
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
