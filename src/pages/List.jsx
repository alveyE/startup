import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { ListProduct } from "../components/Product";
import "../main.css";
import React from "react";

const dummyProducts = [
  {
    name: "Bread",
    prices: {
      Walmart: 2.14,
      Target: 3.49,
      Costco: 2.79,
      Safeway: 3.29,
    },
    imgSrc:
      "https://i5.walmartimages.com/seo/Great-Value-White-Round-Top-Bread-20-oz_8e69fca6-dda1-47b1-959c-7ec4d84b0a58.8cae75bc1ffe9c3d1ece768c0e5447a2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
  },
  {
    name: "Banana",
    prices: {
      Walmart: 0.26,
      Target: 0.29,
      Costco: 0.27,
      Safeway: 0.31,
    },
    imgSrc:
      "https://i5.walmartimages.com/seo/Fresh-Banana-Fruit-Each_5939a6fa-a0d6-431c-88c6-b4f21608e4be.f7cd0cc487761d74c69b7731493c1581.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
  },
  {
    name: "Milk",
    prices: {
      Walmart: 2.99,
      Target: 3.49,
      Costco: 2.79,
      Safeway: 3.29,
    },
    imgSrc:
      "https://i5.walmartimages.com/seo/Great-Value-Milk-Whole-Vitamin-D-Gallon-Plastic-Jug_6a7b09b4-f51d-4bea-a01c-85767f1b481a.86876244397d83ce6cdedb030abe6e4a.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
  },
];

function List() {
  return (
    <>
      <Navbar activePage="list" />
      <div className="list-container">
        <div className="item-list">
          {dummyProducts.map((product, index) => (
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
