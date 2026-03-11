import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import nhmLogo from "../assets/nhm-logo.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/listings", label: "Listings" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

function NavLink({ to, label }: { to: string; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const [hovered, setHovered] = useState(false);

  return (
    <li>
      <Link
        to={to}
        style={{
          ...styles.link,
          color: isActive || hovered ? "#5c3317" : "#2c1a0e",
          borderBottom: isActive
            ? "2px solid #5c3317"
            : "2px solid transparent",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {label}
      </Link>
    </li>
  );
}

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        <img src={nhmLogo} alt="Nation Home Realty" style={styles.logo} />
        <span style={styles.brandText}>
          Nation Home Realty <span style={styles.brandAmp}>&</span> Mortgage
        </span>
      </Link>
      <div style={styles.linksCenter}>
        <ul style={styles.links}>
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} label={l.label} />
          ))}
        </ul>
      </div>
      <Link to="/listings" style={styles.ctaBtn}>
        Browse Listings
      </Link>
    </nav>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2.5rem",
    backgroundColor: "#f5f0e8",
    borderBottom: "1px solid #e0d8cc",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    textDecoration: "none",
  },
  logo: {
    height: 48,
    width: "auto",
    display: "block",
  },
  brandText: {
    fontSize: "1rem",
    fontWeight: 800,
    color: "#2c1a0e",
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  },
  brandAmp: {
    color: "#5c3317",
  },
  linksCenter: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  links: {
    display: "flex",
    gap: "0.25rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  link: {
    padding: "0.4rem 0.75rem",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: 500,
    transition: "color 0.15s",
    paddingBottom: "0.3rem",
  },
  ctaBtn: {
    backgroundColor: "#5c3317",
    color: "#fff",
    borderRadius: 30,
    padding: "0.6rem 1.4rem",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    transition: "background-color 0.2s",
    whiteSpace: "nowrap",
  },
};

export default Navbar;
