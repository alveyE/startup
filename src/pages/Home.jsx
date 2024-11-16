import "../main.css";
import Navbar from "../components/NavBar";
import { Product } from "../components/Product";
import Footer, { MakeSaveList } from "../components/Footer";
import React from "react";

function Home(props) {
  const [products, setProducts] = React.useState([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    fetch("/api/prices")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  return (
    <>
      <Navbar activePage="home" />
      <input
        type="text"
        placeholder="Search"
        className="search-bar"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="grid-container">
        {products
          .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
          .map((product, index) => (
            <Product key={index} product={product} />
          ))}
      </div>
      <MakeSaveList />
      <Footer />
    </>
  );
}

export default Home;
