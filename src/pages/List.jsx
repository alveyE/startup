import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { ListProduct } from "../components/Product";
import "../main.css";
import React from "react";

function List() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/list")
      .then((response) => response.json())
      .then((list) => {
        setProducts(list);
      });
  }, []);

  return (
    <>
      <Navbar activePage="list" />
      <div className="list-container">
        <div className="item-list">
          {products.map((product, index) => (
            <ListProduct key={index} product={product} />
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
              <tr>
                <td>Walmart</td>
                <td>$2.99</td>
              </tr>
              <tr>
                <td>Winco</td>
                <td>$3.74</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="summary">
        <p>
          For your list the most cost effective store is{" "}
          <strong>Walmart</strong>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default List;
