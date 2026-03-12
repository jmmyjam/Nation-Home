import { useState } from "react";

export interface Property {
  id?: number;
  name: string;
  address: string;
  city: string;
  image: string;
  avg_price: number;
}

interface PropertyCardProps {
  property: Property;
  index: number;
  displayName?: string;
}

function PropertyCard({ property, displayName }: PropertyCardProps) {
  const [hovered, setHovered] = useState(false);
  const img = property.image;

  return (
    <div
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 32px rgba(92,51,23,0.18)"
          : "0 4px 16px rgba(92,51,23,0.08)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.imgWrapper}>
        <img src={img} alt={property.name} style={styles.cardImg} />
        <div style={styles.priceBadge}>
          ${property.avg_price.toLocaleString()}
          <span style={styles.priceSuffix}>/mo</span>
        </div>
      </div>
      <div style={styles.cardBody}>
        <h3 style={styles.cardName}>{displayName ?? property.name}</h3>
        <p style={styles.cardAddress}>{property.address}</p>
        <p style={styles.cardCity}>{property.city}</p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.25s, box-shadow 0.25s",
    cursor: "default",
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
    fontSize: "0.95rem",
    fontWeight: 700,
  },
  priceSuffix: { fontSize: "0.75rem", fontWeight: 400, marginLeft: 2 },
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
  cardCity: {
    fontSize: "0.875rem",
    color: "#5c3317",
    fontWeight: 600,
    margin: 0,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  },
};

export default PropertyCard;
