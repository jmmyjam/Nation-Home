import { useNavigate } from "react-router-dom";
import CTAButton from "../components/CTAButton";
import FeatureCard from "../components/FeatureCard";

const HERO_IMG =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=80";

const CARD_IMGS = [
  "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1448630360428-65456885c650?w=600&auto=format&fit=crop&q=80",
];

const BOTTOM_IMGS = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&auto=format&fit=crop&q=80",
];

const cards = [
  {
    title: "Browse Listings",
    description: "Explore our properties and find your dream apartment",
    route: "/listings",
    label: "View Listings",
  },
  {
    title: "Our Services",
    description:
      "Full-service real estate — buying, selling, and home loans all under one roof.",
    route: "/services",
    label: "View Services",
  },
  {
    title: "About Us",
    description:
      "With over a decade of local market expertise, Nation Home Realty is your trusted partner in finding the perfect place to call home.",
    route: "/about",
    label: "Learn More",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* ── Hero ── */}
      <section style={styles.hero}>
        <img src={HERO_IMG} alt="Beautiful home" style={styles.heroBg} />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <p style={styles.heroEyebrow}>Nation Home Realty</p>
          <h1 style={styles.heroHeadline}>
            Your Dream Home
            <br />
            Starts Here
          </h1>
          <p style={styles.heroSub}>
            Trusted local experts helping families find their perfect home
          </p>
          <div style={styles.heroButtons}>
            <CTAButton onClick={() => navigate("/listings")}>
              Browse Listings
            </CTAButton>
            <CTAButton
              onClick={() => navigate("/contact")}
              style={{
                backgroundColor: "transparent",
                border: "2px solid #fff",
              }}
            >
              Contact Us
            </CTAButton>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionIcon}>🏡</span>
          <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
          <p style={styles.sectionSub}>
            We are here to make your housing dreams come true
          </p>
        </div>
        <div style={styles.cardGrid}>
          {cards.map((card, i) => (
            <FeatureCard
              key={card.route}
              img={CARD_IMGS[i]}
              title={card.title}
              description={card.description}
              label={card.label}
              route={card.route}
            />
          ))}
        </div>
      </section>

      {/* ── Visit / CTA Band ── */}
      <section style={styles.ctaBand}>
        <div style={styles.ctaBandLeft}>
          <h2 style={styles.ctaBandTitle}>Find Your Home Today</h2>
          <p style={styles.ctaBandSub}>
            Our agents are ready to walk you through the latest listings and
            answer every question you have.
          </p>
          <p style={styles.ctaBandSub}>
            Stop searching, start living. Let Nation Home Realty open the door
            to your next chapter.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <CTAButton onClick={() => navigate("/listings")}>
              See All Listings
            </CTAButton>
            <CTAButton onClick={() => navigate("/services")}>
              Our Services
            </CTAButton>
          </div>
        </div>
        <div style={styles.ctaBandRight}>
          {BOTTOM_IMGS.map((src, i) => (
            <img key={i} src={src} alt="property" style={styles.ctaBandImg} />
          ))}
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
    paddingBottom: "4rem",
  },

  /* Hero */
  hero: {
    position: "relative",
    height: "90vh",
    minHeight: 520,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(44,26,14,0.72) 0%, rgba(92,51,23,0.45) 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    padding: "0 1.5rem",
    maxWidth: 700,
  },
  heroEyebrow: {
    color: "#e8d5b7",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontSize: "0.85rem",
    marginBottom: "0.75rem",
    fontWeight: 600,
  },
  heroHeadline: {
    color: "#fff",
    fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
    fontWeight: 800,
    lineHeight: 1.15,
    margin: "0 0 1rem",
  },
  heroSub: {
    color: "#e8d5b7",
    fontSize: "1.05rem",
    lineHeight: 1.7,
    marginBottom: "2rem",
    maxWidth: 560,
    marginLeft: "auto",
    marginRight: "auto",
  },
  heroButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  /* Why Choose Us */
  section: {
    padding: "5rem 2rem",
    maxWidth: 1200,
    margin: "0 auto",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  sectionIcon: {
    fontSize: "2rem",
    display: "block",
    marginBottom: "0.5rem",
  },
  sectionTitle: {
    fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
    fontWeight: 800,
    margin: "0 0 1rem",
    color: "#2c1a0e",
  },
  sectionSub: {
    color: "#7a6a5a",
    fontSize: "1rem",
    lineHeight: 1.7,
    maxWidth: 620,
    margin: "0 auto",
  },

  /* Cards */
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
  },

  /* CTA Band */
  ctaBand: {
    backgroundColor: "#ede8de",
    display: "flex",
    flexWrap: "wrap",
    gap: "2.5rem",
    alignItems: "center",
    padding: "5rem 2rem",
    maxWidth: 1200,
    margin: "0 auto",
    borderRadius: 24,
  },
  ctaBandLeft: {
    flex: "1 1 340px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  ctaBandTitle: {
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
    fontWeight: 800,
    margin: 0,
    color: "#2c1a0e",
  },
  ctaBandSub: {
    color: "#7a6a5a",
    fontSize: "0.95rem",
    lineHeight: 1.7,
    margin: 0,
  },
  ctaBandRight: {
    flex: "1 1 280px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
  },
  ctaBandImg: {
    width: "100%",
    height: 160,
    objectFit: "cover",
    borderRadius: 12,
  },
};

export default Home;
