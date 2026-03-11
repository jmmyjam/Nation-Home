import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CTAButton from "./CTAButton";

interface FeatureCardProps {
  img: string;
  title: string;
  description: string;
  label: string;
  route: string;
}

function FeatureCard({
  img,
  title,
  description,
  label,
  route,
}: FeatureCardProps) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

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
      <img src={img} alt={title} style={styles.cardImg} />
      <div style={styles.cardBody}>
        <h3 style={styles.cardTitle}>{title}</h3>
        <p style={styles.cardDesc}>{description}</p>
        <CTAButton onClick={() => navigate(route)}>{label}</CTAButton>
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
  },
  cardImg: {
    width: "100%",
    height: 220,
    objectFit: "cover",
  },
  cardBody: {
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#2c1a0e",
    margin: 0,
  },
  cardDesc: {
    color: "#7a6a5a",
    fontSize: "0.9rem",
    lineHeight: 1.65,
    margin: 0,
    flexGrow: 1,
  },
};

export default FeatureCard;
