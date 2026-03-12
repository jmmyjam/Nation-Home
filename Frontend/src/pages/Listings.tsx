import { useState, useEffect } from "react";
import PropertyCard, { type Property } from "../components/PropertyCard";

const API_URL = "https://nation-home.onrender.com";

function Listings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/allproperties`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const data: Property[] = Array.isArray(json) ? json : (json.data ?? []);
        setProperties(data);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.page}>
      {/* Header */}
      <section style={styles.header}>
        <p style={styles.eyebrow}>Nation Home Realty</p>
        <h1 style={styles.title}>Available Listings</h1>
        <p style={styles.subtitle}>
          Browse our latest properties and find the perfect place to call home
        </p>
      </section>

      {/* Content */}
      <section style={styles.content}>
        {loading && (
          <div style={styles.stateBox}>
            <div style={styles.spinner} />
            <p style={styles.stateText}>Loading listings…</p>
          </div>
        )}

        {error && (
          <div style={styles.errorBox}>
            <p style={styles.errorTitle}>Unable to load listings</p>
            <p style={styles.errorMsg}>{error}</p>
            <p style={styles.errorHint}>
              Make sure the backend is running at{" "}
              <code style={styles.code}>{API_URL}</code>
            </p>
          </div>
        )}

        {!loading && !error && properties.length === 0 && (
          <div style={styles.stateBox}>
            <p style={styles.stateText}>No listings available right now.</p>
          </div>
        )}

        {!loading && !error && properties.length > 0 && (
          <>
            <p style={styles.resultCount}>
              {properties.length} propert
              {properties.length === 1 ? "y" : "ies"} found
            </p>
            <div style={styles.grid}>
              {properties.map((p, i) => (
                <PropertyCard key={p.id ?? i} property={p} index={i} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: "#f5f0e8",
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    color: "#2c1a0e",
    minHeight: "100vh",
  },

  /* Header banner */
  header: {
    backgroundColor: "#2c1a0e",
    textAlign: "center",
    padding: "4rem 2rem 3.5rem",
  },
  eyebrow: {
    color: "#e8d5b7",
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    fontSize: "0.8rem",
    fontWeight: 600,
    marginBottom: "0.75rem",
  },
  title: {
    color: "#fff",
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 800,
    margin: "0 0 1rem",
  },
  subtitle: {
    color: "#e8d5b7",
    fontSize: "1rem",
    lineHeight: 1.7,
    maxWidth: 560,
    margin: "0 auto",
  },

  /* Main content area */
  content: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "3rem 2rem 5rem",
  },
  resultCount: {
    color: "#7a6a5a",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
  },

  /* Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "2rem",
  },

  /* Loading / Error states */
  stateBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5rem 0",
    gap: "1rem",
  },
  stateText: {
    color: "#7a6a5a",
    fontSize: "1rem",
  },
  spinner: {
    width: 40,
    height: 40,
    border: "4px solid #e8d5b7",
    borderTop: "4px solid #5c3317",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  errorBox: {
    backgroundColor: "#fff0ec",
    border: "1px solid #f5c6b8",
    borderRadius: 12,
    padding: "2rem",
    maxWidth: 520,
    margin: "4rem auto",
    textAlign: "center",
  },
  errorTitle: {
    color: "#7a2500",
    fontWeight: 700,
    fontSize: "1.05rem",
    margin: "0 0 0.5rem",
  },
  errorMsg: {
    color: "#7a6a5a",
    fontSize: "0.9rem",
    margin: "0 0 0.75rem",
    fontFamily: "monospace",
  },
  errorHint: {
    color: "#7a6a5a",
    fontSize: "0.875rem",
    margin: 0,
  },
  code: {
    backgroundColor: "#ede8de",
    borderRadius: 4,
    padding: "0.1rem 0.4rem",
    fontFamily: "monospace",
    fontSize: "0.85rem",
  },
};

export default Listings;
