import Footer, { MakeSaveList } from "../components/Footer";
import Navbar from "../components/NavBar";
import { SaleProduct } from "../components/Product";

function Sales() {
  return (
    <>
      <Navbar activePage="sales" />
      <SaleProduct
        name="Bread"
        originalPrice={2.99}
        salePrice={1.42}
        store="Walmart"
        imgSrc="https://i5.walmartimages.com/seo/Great-Value-White-Round-Top-Bread-20-oz_8e69fca6-dda1-47b1-959c-7ec4d84b0a58.8cae75bc1ffe9c3d1ece768c0e5447a2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"
      />
      <MakeSaveList />
      <Footer />
    </>
  );
}

export default Sales;
