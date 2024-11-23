import "../main.css";
import Navbar from "../components/NavBar";
import { Product } from "../components/Product";
import Footer, { MakeSaveList } from "../components/Footer";
import React from "react";

function Home(props) {
  const [products, setProducts] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/prices")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  async function searchProduct() {
    setIsLoading(true);
    const foundProduct = await scrapeProduct(search);
    setIsLoading(false);
    if (foundProduct) {
      setProducts([...products, foundProduct]);
    }
  }

  return (
    <>
      <Navbar activePage="home" />
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && (
        <>
          <input
            type="text"
            placeholder="Search"
            className="search-bar"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          {search.length > 0 &&
            products.filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase())
            ).length === 0 && (
              <div>
                <h2>No results</h2>
                <button className="button" onClick={searchProduct}>
                  Search The Web
                </button>
              </div>
            )}
          <div className="grid-container">
            {products
              .filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((product, index) => (
                <Product key={index} product={product} />
              ))}
          </div>
        </>
      )}
      {!props.username && <MakeSaveList />}
      <Footer />
    </>
  );
}

async function scrapeProduct(name) {
  const apiUrl = `https://api-to-find-grocery-prices.p.rapidapi.com/walmart?query=${name.toLowerCase()}&page=1`;
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e071c35c12mshac2b656e37f785bp1b0d1djsnf47c7ba0103c",
      "x-rapidapi-host": "api-to-find-grocery-prices.p.rapidapi.com",
    },
  });

  const body = await response.json();
  const productFoundBody = body[0];
  const productFound = {
    name:
      productFoundBody.title.length < 30
        ? productFoundBody.title
        : capitalizeEachWord(name),
    imgSrc: productFoundBody.image,
    prices: [
      {
        store: "Walmart",
        price: dropDollarSign(productFoundBody.price.currentPrice),
      },
    ],
  };
  return productFound;
}

function dropDollarSign(str) {
  if (str.startsWith("$")) {
    return str.substring(1);
  }
  return str;
}

function capitalizeEachWord(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default Home;
