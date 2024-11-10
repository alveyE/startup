import Footer, { MakeSaveList } from "../components/Footer";
import Navbar from "../components/NavBar";

function Sales() {
  return (
    <>
      <Navbar activePage="sales" />
      <MakeSaveList />
      <Footer />
    </>
  );
}

export default Sales;
