export function Navbar({ activePage }) {
  return (
    <div className="navbar">
      <a className={activePage === "home" ? "active" : ""} href="index.html">
        Aisle Hawk
      </a>
      <a className={activePage === "list" ? "active" : ""} href="list.html">
        My List
      </a>
      <a className={activePage === "sales" ? "active" : ""} href="sales.html">
        Sales
      </a>
    </div>
  );
}

export default Navbar;
