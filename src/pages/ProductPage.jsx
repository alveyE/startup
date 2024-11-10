import Footer, { MakeSaveList } from "../components/Footer";
import Navbar from "../components/NavBar";
import { ProductOverview } from "../components/Product";

const dummyProduct = {
  name: "Orange Juice",
  imgSrc: "https://dummyimage.com/600x400/ff8c00/ffffff&text=Orange+Juice",
  prices: {
    Walmart: 4.29,
    Target: 4.49,
    Costco: 3.99,
    Safeway: 4.59,
  },
};

function ProductPage() {
  return (
    <>
      <Navbar activePage="home" />
      <ProductOverview product={dummyProduct} />
      <MakeSaveList />
      <Footer />
    </>
  );
}

export default ProductPage;
