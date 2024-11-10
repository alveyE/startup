import Footer from "../components/Footer";
import { ListProduct } from "../components/ListProduct";
import Navbar from "../components/NavBar";

function List() {
  return (
    <>
      <Navbar activePage="list" />
      <div className="list-container">
        <div className="item-list">
          <ListProduct
            name="Bread"
            price="$1.42"
            store="Walmart"
            imgSrc="https://i5.walmartimages.com/seo/Great-Value-White-Round-Top-Bread-20-oz_8e69fca6-dda1-47b1-959c-7ec4d84b0a58.8cae75bc1ffe9c3d1ece768c0e5447a2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"
          />
          <ListProduct
            name="Banana"
            price="$0.26"
            store="Walmart"
            imgSrc="https://i5.walmartimages.com/seo/Fresh-Banana-Fruit-Each_5939a6fa-a0d6-431c-88c6-b4f21608e4be.f7cd0cc487761d74c69b7731493c1581.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"
          />
          <ListProduct
            name="Milk"
            price="$2.99"
            store="Walmart"
            imgSrc="https://i5.walmartimages.com/seo/Great-Value-Milk-Whole-Vitamin-D-Gallon-Plastic-Jug_6a7b09b4-f51d-4bea-a01c-85767f1b481a.86876244397d83ce6cdedb030abe6e4a.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
          />
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
