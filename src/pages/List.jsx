import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { ListProduct } from "../components/Product";
import "../main.css";
import React from "react";

function calculateTotals(products) {
  const totals = {};
  const storeCounts = {};

  products.forEach((product) => {
    Object.entries(product.prices).forEach(([store, price]) => {
      if (!storeCounts[price.store]) {
        storeCounts[price.store] = 0;
      }
      storeCounts[price.store]++;
    });
  });

  const validStores = Object.keys(storeCounts).filter(
    (store) => storeCounts[store] === products.length
  );

  products.forEach((product) => {
    Object.entries(product.prices).forEach(([store, price]) => {
      if (!validStores.includes(price.store)) {
        return;
      }
      if (!totals[price.store]) {
        totals[price.store] = 0;
      }
      totals[price.store] += parseFloat(price.price);
    });
  });
  return totals;
}

function List() {
  const [products, setProducts] = React.useState([]);
  const [totals, setTotals] = React.useState({});
  const [cheapestStore, setCheapestStore] = React.useState("");

  React.useEffect(() => {
    fetch("/api/list")
      .then((response) => response.json())
      .then((list) => {
        setProducts(list);
      });
  }, []);

  React.useEffect(() => {
    setTotals(calculateTotals(products));
    setCheapestStore(
      Object.entries(totals).reduce(
        (cheapest, current) => {
          const currentPrice = parseFloat(current[1]);
          const cheapestPrice = parseFloat(cheapest[1]);
          return currentPrice < cheapestPrice ? current : cheapest;
        },
        ["", Infinity]
      )[0]
    );
  }, [products, totals]);

  return (
    <>
      {products.length === 0 && <h2>Your list is empty</h2>}
      {products.length > 0 && (
        <>
          <div className="list-container">
            <div className="item-list">
              {products.map((product, index) => (
                <ListProduct
                  key={index}
                  product={product}
                  removeFromList={(productRemoved) => {
                    setProducts(products.filter((p) => p !== productRemoved));
                  }}
                />
              ))}
            </div>
            <div className="price-table">
              <table>
                <thead>
                  <tr>
                    <th>Store</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(totals).map(([store, total]) => (
                    <tr key={store}>
                      <td>{store}</td>
                      <td>${Number(total).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="summary">
            <p>
              For your list the most cost effective store is{" "}
              <strong>{cheapestStore}</strong>
            </p>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

export default List;
