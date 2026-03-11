import { useState } from "react";

export interface LoanProduct {
  icon: string;
  label: string;
  tag: string;
  desc: string;
  features: string[];
}

function LoanCard({ loan }: { loan: LoanProduct }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.loanCard,
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 32px rgba(92,51,23,0.16)"
          : "0 3px 12px rgba(92,51,23,0.07)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.loanTop}>
        <span style={styles.loanIcon}>{loan.icon}</span>
        <span style={styles.loanTag}>{loan.tag}</span>
      </div>
      <h3 style={styles.loanTitle}>{loan.label}</h3>
      <p style={styles.loanDesc}>{loan.desc}</p>
      <ul style={styles.featureList}>
        {loan.features.map((f) => (
          <li key={f} style={styles.featureItem}>
            <span style={styles.check}>✓</span> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  loanCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: "1.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    transition: "transform 0.25s, box-shadow 0.25s",
  },
  loanTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loanIcon: { fontSize: "1.75rem" },
  loanTag: {
    backgroundColor: "#f0e8d8",
    color: "#5c3317",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase" as const,
    borderRadius: 20,
    padding: "0.25rem 0.7rem",
  },
  loanTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#2c1a0e",
    margin: 0,
  },
  loanDesc: {
    color: "#7a6a5a",
    fontSize: "0.875rem",
    lineHeight: 1.65,
    margin: 0,
    flexGrow: 1,
  },
  featureList: {
    margin: "0.5rem 0 0",
    padding: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
  },
  featureItem: {
    fontSize: "0.85rem",
    color: "#5a4535",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  check: { color: "#5c3317", fontWeight: 700 },
};

export default LoanCard;
