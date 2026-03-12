import { useNavigate } from "react-router-dom";
import CTAButton from "../components/CTAButton";

const teamMembers = [
  {
    name: "Christina Lee",
    role: "Co-Founder & Principal Broker",
    bio: "With over 20 years in real estate, Maria founded Nation Home Realty on a simple belief: every family deserves an expert advocate in their corner.",
    initials: "CL",
  },
  {
    name: "Daniel Lee",
    role: "Co-Founder",
    bio: "David has helped over 400 families find a home and helps them whenever they need any issues.",
    initials: "DL",
  },
  {
    name: "William Lee",
    role: "Buyer's Agent",
    bio: "William's patient, detail-oriented approach makes him the go-to agent for buyers navigating a competitive market.",
    initials: "WL",
  },
  {
    name: "-",
    role: "-",
    bio: "-",
    initials: "-",
  },
];

const values = [
  {
    icon: "🤝",
    title: "Integrity",
    desc: "We give honest advice even when it's not what you want to hear. Your best interest always comes first.",
  },
  {
    icon: "📍",
    title: "Local Expertise",
    desc: "We live and work in this community. We know the neighborhoods, the schools, and the market trends firsthand.",
  },
  {
    icon: "💬",
    title: "Clear Communication",
    desc: "No jargon, no runaround. We keep you informed at every step so you always know where things stand.",
  },
  {
    icon: "🎯",
    title: "Results-Driven",
    desc: "We measure our success by yours — fast closings, fair prices, and clients who come back and send their friends.",
  },
];

const stats = [
  { value: "500+", label: "Families Helped" },
  { value: "20+", label: "Years in Business" },
  { value: "95%", label: "Client Satisfaction" },
  { value: "24 hrs", label: "Average Response Time" },
];

function About() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Header */}
      <section style={styles.header}>
        <p style={styles.eyebrow}>Our Story</p>
        <h1 style={styles.headerTitle}>About Nation Home Realty</h1>
        <p style={styles.headerSub}>
          A family-owned brokerage built on trust, local knowledge, and an
          unwavering commitment to the communities we serve.
        </p>
      </section>

      {/* Story */}
      <section style={styles.storySection}>
        <div style={styles.storyText}>
          <h2 style={styles.storyTitle}>How We Started</h2>
          <p style={styles.storyP}>
            Nation Home Realty &amp; Mortgage was founded in 2006 by Maria
            Gonzalez after she experienced firsthand how overwhelming the
            homebuying process can be. She set out to build an agency where
            clients felt informed, respected, and genuinely supported — not just
            pushed through a transaction.
          </p>
          <p style={styles.storyP}>
            What started as a one-person operation has grown into a full-service
            brokerage with an in-house mortgage team, giving clients access to
            both real estate expertise and financing under one roof. Today we've
            helped more than 500 families buy, sell, and finance their homes
            across the region.
          </p>
          <CTAButton onClick={() => navigate("/contact")}>
            Talk to Our Team
          </CTAButton>
        </div>
        <div style={styles.storyImgWrap}>
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&auto=format&fit=crop&q=80"
            alt="Our team"
            style={styles.storyImg}
          />
        </div>
      </section>

      {/* Stats */}
      <section style={styles.statsBar}>
        {stats.map((s) => (
          <div key={s.label} style={styles.statItem}>
            <span style={styles.statValue}>{s.value}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* Values */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>What We Stand For</h2>
          <p style={styles.sectionSub}>
            These aren't just words on a wall — they guide every decision we
            make on your behalf.
          </p>
        </div>
        <div style={styles.valuesGrid}>
          {values.map((v) => (
            <div key={v.title} style={styles.valueCard}>
              <span style={styles.valueIcon}>{v.icon}</span>
              <h3 style={styles.valueTitle}>{v.title}</h3>
              <p style={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section
        style={{
          ...styles.section,
          backgroundColor: "#ede8de",
          borderRadius: 24,
          marginBottom: "3rem",
        }}
      >
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Meet the Team</h2>
          <p style={styles.sectionSub}>
            Real people who are passionate about helping you find your place.
          </p>
        </div>
        <div style={styles.teamGrid}>
          {teamMembers.map((m) => (
            <div key={m.name} style={styles.teamCard}>
              <div style={styles.avatar}>{m.initials}</div>
              <h3 style={styles.memberName}>{m.name}</h3>
              <p style={styles.memberRole}>{m.role}</p>
              <p style={styles.memberBio}>{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaBand}>
        <h2 style={styles.ctaTitle}>Let's Find Your Home Together</h2>
        <p style={styles.ctaSub}>
          Reach out today — we'd love to learn about your goals and show you
          what Nation Home Realty can do for you.
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
    maxWidth: 580,
    margin: "0 auto",
  },

  /* Story */
  storySection: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "5rem 2rem",
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "3rem",
    alignItems: "center",
  },
  storyText: {
    flex: "1 1 340px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  storyTitle: {
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
    fontWeight: 800,
    margin: 0,
    color: "#2c1a0e",
  },
  storyP: {
    color: "#7a6a5a",
    fontSize: "0.95rem",
    lineHeight: 1.75,
    margin: 0,
  },
  storyImgWrap: { flex: "1 1 320px" },
  storyImg: {
    width: "100%",
    borderRadius: 20,
    objectFit: "cover" as const,
    height: 360,
  },

  /* Stats */
  statsBar: {
    backgroundColor: "#5c3317",
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "space-around",
    gap: "1.5rem",
    padding: "3rem 2rem",
  },
  statItem: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "0.25rem",
  },
  statValue: { fontSize: "2.2rem", fontWeight: 800, color: "#fff" },
  statLabel: {
    fontSize: "0.8rem",
    color: "#e8d5b7",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    fontWeight: 600,
  },

  /* Section */
  section: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "4rem 2rem",
  },
  sectionHeader: { textAlign: "center", marginBottom: "2.5rem" },
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

  /* Values */
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.5rem",
  },
  valueCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: "1.75rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.6rem",
    boxShadow: "0 3px 12px rgba(92,51,23,0.07)",
  },
  valueIcon: { fontSize: "2rem" },
  valueTitle: {
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "#2c1a0e",
    margin: 0,
  },
  valueDesc: {
    color: "#7a6a5a",
    fontSize: "0.875rem",
    lineHeight: 1.65,
    margin: 0,
  },

  /* Team */
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "1.75rem",
  },
  teamCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: "2rem 1.5rem",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center",
    gap: "0.5rem",
    boxShadow: "0 3px 12px rgba(92,51,23,0.07)",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    backgroundColor: "#5c3317",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.3rem",
    fontWeight: 800,
    marginBottom: "0.5rem",
  },
  memberName: {
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "#2c1a0e",
    margin: 0,
  },
  memberRole: {
    fontSize: "0.8rem",
    color: "#5c3317",
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    margin: 0,
  },
  memberBio: {
    color: "#7a6a5a",
    fontSize: "0.85rem",
    lineHeight: 1.6,
    margin: 0,
  },

  /* CTA */
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
    flexWrap: "wrap" as const,
  },

  btn: {
    backgroundColor: "#5c3317",
    color: "#fff",
    border: "none",
    borderRadius: 30,
    padding: "0.75rem 1.8rem",
    fontSize: "0.95rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.2s",
    textTransform: "uppercase" as const,
  },
};

export default About;
