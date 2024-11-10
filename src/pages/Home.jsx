import "../main.css";
import Navbar from "../components/NavBar";
import { Product } from "../components/Product";
import Footer, { MakeSaveList } from "../components/Footer";

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

function Home() {
  return (
    <>
      <Navbar activePage="home" />
      <input type="text" placeholder="Search" className="search-bar" />
      <div className="grid-container">
        {dummyProducts.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
      <MakeSaveList />
      <Footer />
    </>
  );
}

export default Home;