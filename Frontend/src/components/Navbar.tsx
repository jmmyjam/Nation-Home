import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import nhmLogo from "../assets/nhm-logo.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/listings", label: "Listings" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

function NavLink({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick?: () => void;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const [hovered, setHovered] = useState(false);

  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu on route change
  const location = useLocation();
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav style={styles.nav}>
        <Link to="/" style={styles.brand}>
          <img src={nhmLogo} alt="Nation Home Realty" style={styles.logo} />
          <span style={styles.brandText}>
            Nation Home Realty <span style={styles.brandAmp}>&</span> Mortgage
          </span>
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <div style={styles.linksCenter}>
            <ul style={styles.links}>
              {NAV_LINKS.map((l) => (
                <NavLink key={l.to} to={l.to} label={l.label} />
              ))}
            </ul>
          </div>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <Link to="/listings" style={styles.ctaBtn}>
            Browse Listings
          </Link>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button
            style={styles.hamburger}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              style={{ ...styles.bar, ...(menuOpen ? styles.barTopOpen : {}) }}
            />
            <span style={{ ...styles.bar, opacity: menuOpen ? 0 : 1 }} />
            <span
              style={{ ...styles.bar, ...(menuOpen ? styles.barBotOpen : {}) }}
            />
          </button>
        )}
      </nav>

      {/* Mobile drawer */}
      {isMobile && (
        <div
          style={{
            ...styles.drawer,
            maxHeight: menuOpen ? "400px" : "0px",
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <ul style={styles.drawerLinks}>
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                label={l.label}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </ul>
          <Link
            to="/listings"
            style={styles.drawerCta}
            onClick={() => setMenuOpen(false)}
          >
            Browse Listings
          </Link>
        </div>
      )}
    </>
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
    display: "block",
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

  /* Hamburger */
  hamburger: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  bar: {
    display: "block",
    width: 24,
    height: 2,
    backgroundColor: "#2c1a0e",
    borderRadius: 2,
    transition: "transform 0.25s, opacity 0.25s",
  },
  barTopOpen: {
    transform: "translateY(7px) rotate(45deg)",
  },
  barBotOpen: {
    transform: "translateY(-7px) rotate(-45deg)",
  },

  /* Mobile drawer */
  drawer: {
    backgroundColor: "#f5f0e8",
    borderBottom: "1px solid #e0d8cc",
    overflow: "hidden",
    transition: "max-height 0.3s ease, opacity 0.3s ease",
    position: "sticky",
    top: 73,
    zIndex: 99,
  },
  drawerLinks: {
    listStyle: "none",
    margin: 0,
    padding: "0.5rem 1.5rem",
    display: "flex",
    flexDirection: "column",
  },
  drawerCta: {
    display: "block",
    margin: "0.75rem 1.5rem 1.25rem",
    backgroundColor: "#5c3317",
    color: "#fff",
    borderRadius: 30,
    padding: "0.75rem 1.4rem",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    textAlign: "center",
  },
};

export default Navbar;
