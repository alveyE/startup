import React from "react";
import "../main.css";
import { useNavigate } from "react-router-dom";

export function Product({ product, inList }) {
  const { name, imgSrc, prices } = product;
  const [addedToList, setAddedToList] = React.useState(inList);

  const navigate = useNavigate();

  React.useEffect(() => {
    setAddedToList(inList);
  }, [inList]);

  const { store, price } = prices.reduce(
    (cheapest, current) => {
      const currentPrice = parseFloat(current.price);
      const cheapestPrice = parseFloat(cheapest.price);
      return currentPrice < cheapestPrice ? current : cheapest;
    },
    { store: null, price: Infinity }
  );

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
          style={{ backgroundColor: addedToList ? "#780800" : "0066cc" }}
          onClick={(e) => {
            e.stopPropagation();
            setAddedToList(!addedToList);
            //call api to add/remove to list
            fetch("/api/list", {
              method: addedToList ? "DELETE" : "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ product }),
            });
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

export function ListProduct(props) {
  const navigate = useNavigate();

  const { name, imgSrc, prices } = props.product;
  const product = props.product;

  const { store, price } = prices.reduce(
    (cheapest, current) => {
      const currentPrice = parseFloat(current.price);
      const cheapestPrice = parseFloat(cheapest.price);
      return currentPrice < cheapestPrice ? current : cheapest;
    },
    { store: null, price: Infinity }
  );

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
        <p>${price}</p>
        <p>Cheapest - {store}</p>
      </div>
      <button
        className="button"
        onClick={(e) => {
          e.stopPropagation();
          props.removeFromList(props.product);
          fetch("/api/list", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ product }),
          });
        }}
      >
        Remove from my list
      </button>
    </div>
  );
}

export function ProductOverview({ product }) {
  const { name, imgSrc, prices } = product;
  const [addedToList, setAddedToList] = React.useState(false);

  if (!prices) {
    return <h2>Product not found</h2>;
  }

  const cheapestStore = prices.reduce(
    (cheapest, current) => {
      const currentPrice = parseFloat(current.price);
      const cheapestPrice = parseFloat(cheapest.price);
      return currentPrice < cheapestPrice ? current : cheapest;
    },
    { store: null, price: Infinity }
  ).store;

  return (
    <div className="product-container">
      <img src={imgSrc} alt={name} />
      <div className="product-details">
        <h2>{name}</h2>
        <ul>
          {prices.map((p) => (
            <li key={p.store}>
              {p.store}: ${p.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p style={{ fontSize: "1.5em" }}>
          <strong>Cheapest - {cheapestStore}</strong>
        </p>
        <button className="button" onClick={() => setAddedToList(!addedToList)}>
          {addedToList ? "Remove from my list" : "Add to my list"}
        </button>{" "}
      </div>
    </div>
  );
}
