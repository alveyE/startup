import React from "react";
import "../main.css";

export function Product({ name, price, store, imgSrc }) {
  const [addedToList, setAddedToList] = React.useState(false);

  return (
    <div className="grid-item">
      <img src={imgSrc} alt={name} />
      <div>
        <h2>
          <a href={`product.html`}>{name}</a>
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
