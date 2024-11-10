import { useLocation } from "react-router";
import Footer, { MakeSaveList } from "../components/Footer";
import Navbar from "../components/NavBar";
import { ProductOverview } from "../components/Product";

function ProductPage() {
  const location = useLocation();
  const { product } = location.state || {};

  return (
    <>
      <Navbar activePage="home" />
      {product ? (
        <ProductOverview product={product} />
      ) : (
        <h2>Product not found</h2>
      )}
      <MakeSaveList />
      <Footer />
    </>
  );
}

export default ProductPage;
