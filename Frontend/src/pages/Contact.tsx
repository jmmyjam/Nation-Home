import { useState } from "react";
import emailjs from "@emailjs/browser";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import TextareaField from "../components/TextareaField";

const EMAILJS_SERVICE_ID = "service_9oecj38";
const EMAILJS_TEMPLATE_ID = "template_da04rp3";
const EMAILJS_PUBLIC_KEY = "rBXmqwribFy-ZmSbd";

type FormState = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

type Status = "idle" | "sending" | "sent" | "error";

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  interest: "General Inquiry",
  message: "",
};

const INTEREST_OPTIONS = [
  "General Inquiry",
  "Renting a Home",
  "Selling a Home",
  "Mortgage / Loan",
  "Refinancing",
  "Property Management",
];

const contactInfo = [
  { icon: "📞", label: "Phone", value: "(650) 991-1900" },
  { icon: "✉️", label: "Email", value: "team@dnclee.com" },
  {
    icon: "📍",
    label: "Address",
    value: "345 Gellert Blvd, Suite D\nDaly City, CA 94010",
  },
  {
    icon: "🕐",
    label: "Hours",
    value: "Mon - Fri: 9 AM - 5 PM",
  },
];

function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(id: string, val: string) {
    setForm((prev) => ({ ...prev, [id]: val }));
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          interest: form.interest,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <section style={styles.header}>
        <p style={styles.eyebrow}>Get in Touch</p>
        <h1 style={styles.headerTitle}>Contact Us</h1>
        <p style={styles.headerSub}>
          Have questions? Ready to start? Our team typically responds within one
          to two business days.
        </p>
      </section>

      {/* Main */}
      <section style={styles.main}>
        {/* Contact info column */}
        <div style={styles.infoCol}>
          <h2 style={styles.infoTitle}>Contact Information</h2>
          {contactInfo.map((item) => (
            <div key={item.label} style={styles.infoItem}>
              <span style={styles.infoIcon}>{item.icon}</span>
              <div>
                <p style={styles.infoLabel}>{item.label}</p>
                <p style={styles.infoValue}>{item.value}</p>
              </div>
            </div>
          ))}

          <div style={styles.mapPlaceholder}>
            <img
              src="https://www.google.com/maps/vt/data=hmWJhJEge7bFs7eYgDrDHoKUAfHA0WzF46Gwl4a6G6UJC1IIHc-OtLEEqRoZ5qneL3S7k0ILr-StzmK_pxgfzvizYPpAlJpyOTCvJcd65Yvu0AjuwdIh-rPijw2FYzksucm89qRdO6vIAjti1184MsKGhVOrPOK9SxsjTw_OjqtTOcYVnkcQ3z1njWiyFiLj1Z4URMv8fy2AdwTo5-_BfsrJNwTnd9KtYKbdbgmlePGjIvWCPHqq_b-CX31viFQDKh45d30iAbwlUa8xjqeJ7LKTRA"
              alt="Office location"
              style={styles.mapImg}
            />
          </div>
        </div>

        {/* Form column */}
        <div style={styles.formCol}>
          {status === "sent" ? (
            <div style={styles.successBox}>
              <span style={styles.successIcon}>✓</span>
              <h3 style={styles.successTitle}>Message Sent!</h3>
              <p style={styles.successMsg}>
                Thanks, {form.name.split(" ")[0]}! We'll be in touch soon.
              </p>
              <button
                onClick={() => {
                  setForm(INITIAL);
                  setStatus("idle");
                }}
                style={styles.resetBtn}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form} noValidate>
              <h2 style={styles.formTitle}>Send Us a Message</h2>

              <div style={styles.row}>
                <InputField
                  label="Full Name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  required
                />
                <InputField
                  label="Email"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  required
                />
              </div>

              <div style={styles.row}>
                <InputField
                  label="Phone"
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(555) 000-0000"
                  required
                />
                <SelectField
                  label="I'm interested in…"
                  id="interest"
                  value={form.interest}
                  onChange={handleChange}
                  options={INTEREST_OPTIONS}
                />
              </div>

              <TextareaField
                label="Message"
                id="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us a bit about what you're looking for…"
              />

              {status === "error" && (
                <p style={{ color: "#b00", fontSize: "0.9rem", margin: 0 }}>
                  Something went wrong. Please try again or email us directly at
                  team@dnclee.com.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending" || !form.name || !form.email}
                style={{
                  ...styles.submitBtn,
                  opacity: !form.name || !form.email || !form.phone ? 0.55 : 1,
                  cursor:
                    !form.name || !form.email || !form.phone
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
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
    maxWidth: 520,
    margin: "0 auto",
  },

  /* Two-column layout */
  main: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "4rem 2rem 5rem",
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "3rem",
    alignItems: "flex-start",
  },

  /* Info col */
  infoCol: {
    flex: "1 1 280px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.25rem",
  },
  infoTitle: {
    fontSize: "1.3rem",
    fontWeight: 800,
    margin: 0,
    color: "#2c1a0e",
  },
  infoItem: { display: "flex", gap: "0.9rem", alignItems: "flex-start" },
  infoIcon: { fontSize: "1.4rem", lineHeight: 1, marginTop: 2 },
  infoLabel: {
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase" as const,
    color: "#5c3317",
    margin: "0 0 0.2rem",
  },
  infoValue: {
    fontSize: "0.9rem",
    color: "#2c1a0e",
    margin: 0,
    lineHeight: 1.6,
    whiteSpace: "pre-line" as const,
  },
  mapPlaceholder: { borderRadius: 14, overflow: "hidden", marginTop: "0.5rem" },
  mapImg: {
    width: "100%",
    height: 200,
    objectFit: "cover" as const,
    display: "block",
  },

  /* Form col */
  formCol: {
    flex: "2 1 400px",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: "2.5rem",
    boxShadow: "0 4px 24px rgba(92,51,23,0.09)",
  },
  form: { display: "flex", flexDirection: "column" as const, gap: "1.25rem" },
  formTitle: {
    fontSize: "1.4rem",
    fontWeight: 800,
    margin: "0 0 0.5rem",
    color: "#2c1a0e",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1.25rem",
  },
  submitBtn: {
    backgroundColor: "#5c3317",
    color: "#fff",
    border: "none",
    borderRadius: 30,
    padding: "0.85rem 2rem",
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    alignSelf: "flex-start",
    transition: "background-color 0.2s",
  },

  /* Success state */
  successBox: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center",
    padding: "3rem 1rem",
    gap: "0.75rem",
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    backgroundColor: "#5c3317",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6rem",
    fontWeight: 800,
    marginBottom: "0.5rem",
  },
  successTitle: {
    fontSize: "1.4rem",
    fontWeight: 800,
    color: "#2c1a0e",
    margin: 0,
  },
  successMsg: { color: "#7a6a5a", fontSize: "0.95rem", margin: 0 },
  resetBtn: {
    marginTop: "0.5rem",
    backgroundColor: "transparent",
    color: "#5c3317",
    border: "2px solid #5c3317",
    borderRadius: 30,
    padding: "0.6rem 1.4rem",
    fontSize: "0.875rem",
    fontWeight: 700,
    cursor: "pointer",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
};

export default Contact;
