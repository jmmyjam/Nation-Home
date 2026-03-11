import { useNavigate } from "react-router-dom";
import CTAButton from "../components/CTAButton";
import LoanCard, { type LoanProduct } from "../components/LoanCard";

const realEstateServices = [
  {
    icon: "🏠",
    title: "Home Buying",
    desc: "We guide you through every step of the purchase process — from your first showing to closing day. Our agents know the local market inside and out.",
  },
  {
    icon: "📋",
    title: "Home Selling",
    desc: "Get maximum value for your property with our proven marketing strategy, professional staging advice, and expert negotiation.",
  },
  {
    icon: "🔑",
    title: "Property Management",
    desc: "Own rental property? We handle tenant screening, rent collection, maintenance coordination, and monthly reporting so you don't have to.",
  },
  {
    icon: "📊",
    title: "Market Analysis",
    desc: "Receive a detailed comparative market analysis (CMA) to understand exactly what your home is worth in today's market.",
  },
];

const loanProducts: LoanProduct[] = [
  {
    icon: "📈",
    label: "Fixed-Rate Mortgage",
    tag: "Most Popular",
    desc: "Lock in a stable interest rate for the life of your loan — 10, 15, 20, or 30-year terms available. Predictable payments, zero surprises.",
    features: [
      "Stable monthly payments",
      "Protection from rate increases",
      "15 & 30-year terms",
    ],
  },
  {
    icon: "🔄",
    label: "Adjustable-Rate Mortgage",
    tag: "Low Intro Rate",
    desc: "Start with a lower rate that adjusts periodically. Ideal if you plan to sell or refinance before the initial fixed period ends.",
    features: [
      "Lower initial rate",
      "5/1, 7/1, 10/1 ARM options",
      "Rate caps for protection",
    ],
  },
  {
    icon: "🏛️",
    label: "FHA Loan",
    tag: "Low Down Payment",
    desc: "Government-backed loan with a down payment as low as 3.5%. Great for first-time buyers or those rebuilding credit.",
    features: [
      "3.5% minimum down payment",
      "Flexible credit requirements",
      "Competitive rates",
    ],
  },
  {
    icon: "🎖️",
    label: "VA Loan",
    tag: "Veterans & Military",
    desc: "Exclusively for eligible veterans, active-duty service members, and surviving spouses. No down payment, no PMI.",
    features: [
      "$0 down payment",
      "No private mortgage insurance",
      "Limited closing costs",
    ],
  },
  {
    icon: "💱",
    label: "Refinancing",
    tag: "Lower Your Rate",
    desc: "Already own a home? We can help you lower your rate, shorten your term, or tap your home's equity with a cash-out refinance.",
    features: [
      "Rate-and-term refinance",
      "Cash-out refinance",
      "Streamline refinance options",
    ],
  },
];

function Services() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Header */}
      <section style={styles.header}>
        <p style={styles.eyebrow}>Nation Home Realty &amp; Mortgage</p>
        <h1 style={styles.headerTitle}>Our Services</h1>
        <p style={styles.headerSub}>
          Full-service real estate and mortgage solutions — everything you need
          to buy, sell, or finance your home under one roof.
        </p>
      </section>

      {/* Real Estate */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Real Estate Services</h2>
          <p style={styles.sectionSub}>
            Our licensed agents are here to make your transaction smooth and
            stress-free from start to finish.
          </p>
        </div>
        <div style={styles.serviceGrid}>
          {realEstateServices.map((s) => (
            <div key={s.title} style={styles.serviceCard}>
              <span style={styles.serviceIcon}>{s.icon}</span>
              <h3 style={styles.serviceTitle}>{s.title}</h3>
              <p style={styles.serviceDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={styles.divider} />

      {/* Mortgage / Loans */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Mortgage &amp; Loan Products</h2>
          <p style={styles.sectionSub}>
            Whether you're a first-time buyer or a seasoned investor, we have a
            loan program designed for your situation.
          </p>
        </div>
        <div style={styles.loanGrid}>
          {loanProducts.map((loan) => (
            <LoanCard key={loan.label} loan={loan} />
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section style={styles.ctaBand}>
        <h2 style={styles.ctaTitle}>Ready to Get Started?</h2>
        <p style={styles.ctaSub}>
          Speak with one of our agents or mortgage specialists today — no
          obligation, just answers.
        </p>
        <div style={styles.ctaButtons}>
          <CTAButton onClick={() => navigate("/contact")}>Contact Us</CTAButton>
          <CTAButton onClick={() => navigate("/listings")}>
            Browse Listings
          </CTAButton>
        </div>
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
  headerTitle: {
    color: "#fff",
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 800,
    margin: "0 0 1rem",
  },
  headerSub: {
    color: "#e8d5b7",
    fontSize: "1rem",
    lineHeight: 1.7,
    maxWidth: 600,
    margin: "0 auto",
  },

  section: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "4rem 2rem",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "2.5rem",
  },
  sectionTitle: {
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
    fontWeight: 800,
    margin: "0 0 0.75rem",
    color: "#2c1a0e",
  },
  sectionSub: {
    color: "#7a6a5a",
    fontSize: "1rem",
    lineHeight: 1.7,
    maxWidth: 580,
    margin: "0 auto",
  },

  divider: {
    height: 1,
    backgroundColor: "#e0d8cc",
    maxWidth: 1100,
    margin: "0 auto",
  },

  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.5rem",
  },
  serviceCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: "1.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    boxShadow: "0 3px 12px rgba(92,51,23,0.07)",
  },
  serviceIcon: { fontSize: "2rem" },
  serviceTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#2c1a0e",
    margin: 0,
  },
  serviceDesc: {
    color: "#7a6a5a",
    fontSize: "0.9rem",
    lineHeight: 1.65,
    margin: 0,
  },

  loanGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.75rem",
  },
  ctaBand: {
    backgroundColor: "#2c1a0e",
    textAlign: "center",
    padding: "5rem 2rem",
  },
  ctaTitle: {
    color: "#fff",
    fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
    fontWeight: 800,
    margin: "0 0 1rem",
  },
  ctaSub: {
    color: "#e8d5b7",
    fontSize: "1rem",
    lineHeight: 1.7,
    maxWidth: 520,
    margin: "0 auto 2rem",
  },
  ctaButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
};

export default Services;
