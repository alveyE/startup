import Footer, { MakeSaveList } from "../components/Footer";
import Navbar from "../components/NavBar";
import { SaleProduct } from "../components/Product";
import React from "react";

const dummySalesProduct = {
  name: "Bread",
  prices: {
    Walmart: 2.14,
    Target: 3.49,
    Costco: 2.79,
    Safeway: 3.29,
  },
  store: "Walmart",
  imgSrc:
    "https://i5.walmartimages.com/seo/Great-Value-White-Round-Top-Bread-20-oz_8e69fca6-dda1-47b1-959c-7ec4d84b0a58.8cae75bc1ffe9c3d1ece768c0e5447a2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
};

function Sales() {
  return (
    <>
      <SaleProduct
        product={dummySalesProduct}
        originalPrice={2.99}
        salePrice={1.99}
        store="Walmart"
      />
      <MakeSaveList />
      <Footer />
    </>
  );
}

export default Sales;
