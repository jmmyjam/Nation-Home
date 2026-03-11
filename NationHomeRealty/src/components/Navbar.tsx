import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        Nation Home Realty
      </Link>
      <ul style={styles.links}>
        <li>
          <Link to="/" style={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/listings" style={styles.link}>
            Listings
          </Link>
        </li>
        <li>
          <Link to="/about" style={styles.link}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" style={styles.link}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    backgroundColor: "#1a1a2e",
    color: "#fff",
  },
  brand: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#fff",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "1.5rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#ccc",
    textDecoration: "none",
    fontSize: "1rem",
  },
};

export default Navbar;
