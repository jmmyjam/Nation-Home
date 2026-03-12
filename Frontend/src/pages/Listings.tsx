import { useState, useEffect } from "react";
import PropertyCard, { type Property } from "../components/PropertyCard";

const API_URL = "https://nation-home.onrender.com";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";

interface ParentProperty {
  name: string;
  address: string;
  image: string;
}

function groupByParent(
  properties: Property[],
  parentNames: string[],
): Record<string, Property[]> {
  const groups: Record<string, Property[]> = {};
  for (const p of properties) {
    const key = parentNames.find((k) =>
      p.name.toLowerCase().includes(k.toLowerCase()),
    );
    const group = key ?? "Other";
    if (!groups[group]) groups[group] = [];
    groups[group].push(p);
  }
  return groups;
}

function Listings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [parentProperties, setParentProperties] = useState<ParentProperty[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/allproperties`).then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      }),
      fetch(`${API_URL}/parentproperties`).then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      }),
    ])
      .then(([units, parents]) => {
        const data: Property[] = Array.isArray(units)
          ? units
          : (units.data ?? []);
        setProperties(data);
        setParentProperties(Array.isArray(parents) ? parents : []);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const parentByName = Object.fromEntries(
    parentProperties.map((p) => [p.name, p]),
  );
  const parentNames = parentProperties.map((p) => p.name);
  const groups = groupByParent(properties, parentNames);
  const groupKeys = Object.keys(groups).sort((a, b) =>
    a === "Other" ? 1 : b === "Other" ? -1 : a.localeCompare(b),
  );

  const selectedListings = selectedGroup ? (groups[selectedGroup] ?? []) : [];
  const selectedParent = selectedGroup ? parentByName[selectedGroup] : null;

  return (
    <div style={styles.page}>
      {/* Header */}
      <section style={styles.header}>
        <p style={styles.eyebrow}>Nation Home Realty</p>
        <h1 style={styles.title}>{selectedGroup ?? "Available Listings"}</h1>
        <p style={styles.subtitle}>
          {selectedParent
            ? selectedParent.address
            : "Browse our latest properties and find the perfect place to call home"}
        </p>
      </section>

      {/* Content */}
      <section style={styles.content}>
        {/* Back button */}
        {selectedGroup && (
          <button style={styles.backBtn} onClick={() => setSelectedGroup(null)}>
            ← All Properties
          </button>
        )}

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
          </div>
        )}

        {!loading && !error && properties.length === 0 && (
          <div style={styles.stateBox}>
            <p style={styles.stateText}>
              No listings available right now please call.
            </p>
          </div>
        )}

        {/* Parent property grid */}
        {!loading && !error && properties.length > 0 && !selectedGroup && (
          <>
            <p style={styles.resultCount}>
              {groupKeys.length} propert{groupKeys.length === 1 ? "y" : "ies"}
            </p>
            <div style={styles.grid}>
              {groupKeys.map((key) => {
                const units = groups[key];
                const parent = parentByName[key];
                const img = parent?.image || PLACEHOLDER_IMG;
                const avgPrice = Math.round(
                  units.reduce((sum, u) => sum + u.price, 0) / units.length,
                );
                const priceLabel = `$${avgPrice.toLocaleString()}/mo avg`;
                return (
                  <ParentCard
                    key={key}
                    name={key}
                    address={parent?.address ?? ""}
                    image={img}
                    unitCount={units.length}
                    priceLabel={priceLabel}
                    onClick={() => setSelectedGroup(key)}
                  />
                );
              })}
            </div>
          </>
        )}

        {/* Individual listings for selected group */}
        {!loading && !error && selectedGroup && (
          <>
            <p style={styles.resultCount}>
              {selectedListings.length} unit
              {selectedListings.length === 1 ? "" : "s"} available
            </p>
            <div style={styles.grid}>
              {selectedListings.map((p, i) => {
                const unitType =
                  p.name
                    .replace(new RegExp(`^${selectedGroup}\\s*`, "i"), "")
                    .trim() || p.name;
                return (
                  <PropertyCard
                    key={p.id ?? i}
                    property={p}
                    index={i}
                    displayName={unitType}
                  />
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

/* ── Parent Property Card ─────────────────────────────────────── */

interface ParentCardProps {
  name: string;
  address: string;
  image: string;
  unitCount: number;
  priceLabel: string;
  onClick: () => void;
}

function ParentCard({
  name,
  address,
  image,
  unitCount,
  priceLabel,
  onClick,
}: ParentCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...cardStyles.card,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 32px rgba(92,51,23,0.18)"
          : "0 4px 16px rgba(92,51,23,0.08)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div style={cardStyles.imgWrapper}>
        <img
          src={image}
          alt={name}
          style={cardStyles.cardImg}
          onError={(e) => {
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
          }}
        />
        <div style={cardStyles.priceBadge}>{priceLabel}</div>
      </div>
      <div style={cardStyles.cardBody}>
        <h3 style={cardStyles.cardName}>{name}</h3>
        <p style={cardStyles.cardAddress}>{address}</p>
        <p style={cardStyles.cardUnits}>
          {unitCount} unit{unitCount === 1 ? "" : "s"} available →
        </p>
      </div>
    </div>
  );
}

/* ── Styles ───────────────────────────────────────────────────── */

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: "#f5f0e8",
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    color: "#2c1a0e",
    minHeight: "100vh",
  },
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
  content: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "3rem 2rem 5rem",
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    background: "none",
    border: "1.5px solid #5c3317",
    borderRadius: 8,
    color: "#5c3317",
    fontWeight: 600,
    fontSize: "0.9rem",
    padding: "0.45rem 1rem",
    cursor: "pointer",
    marginBottom: "1.75rem",
  },
  resultCount: {
    color: "#7a6a5a",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "2rem",
  },
  stateBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5rem 0",
    gap: "1rem",
  },
  stateText: { color: "#7a6a5a", fontSize: "1rem" },
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
  errorHint: { color: "#7a6a5a", fontSize: "0.875rem", margin: 0 },
  code: {
    backgroundColor: "#ede8de",
    borderRadius: 4,
    padding: "0.1rem 0.4rem",
    fontFamily: "monospace",
    fontSize: "0.85rem",
  },
};

const cardStyles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.25s, box-shadow 0.25s",
    cursor: "pointer",
  },
  imgWrapper: { position: "relative" },
  cardImg: { width: "100%", height: 210, objectFit: "cover", display: "block" },
  priceBadge: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "#5c3317",
    color: "#fff",
    borderRadius: 20,
    padding: "0.35rem 0.9rem",
    fontSize: "0.85rem",
    fontWeight: 700,
  },
  cardBody: {
    padding: "1.25rem 1.5rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  cardName: {
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "#2c1a0e",
    margin: 0,
  },
  cardAddress: { fontSize: "0.875rem", color: "#7a6a5a", margin: 0 },
  cardUnits: {
    fontSize: "0.875rem",
    color: "#5c3317",
    fontWeight: 600,
    margin: "0.4rem 0 0",
  },
};

export default Listings;
