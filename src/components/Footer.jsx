import React from "react";

function Footer() {
  return (
    <footer>
      <p>&copy; Ethan Alvey</p>
      <a href="https://github.com/alveyE/startup">Github Repo</a>
    </footer>
  );
}

export function MakeSaveList() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <p style={{ fontSize: "larger", fontWeight: "bold" }}>
        To make and save lists
      </p>
      <a
        href="login.html"
        style={{
          fontSize: "larger",
          color: "blue",
          textDecoration: "underline",
        }}
      >
        Login or Create Account
      </a>
    </div>
  );
}

export default Footer;
