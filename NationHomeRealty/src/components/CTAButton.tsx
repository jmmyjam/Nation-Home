import { useState } from "react";

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  outline?: boolean;
  style?: React.CSSProperties;
}

function CTAButton({ children, onClick, outline, style }: CTAButtonProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: outline
          ? "transparent"
          : hovered
            ? "#3e2008"
            : "#5c3317",
        color: outline ? "#5c3317" : "#fff",
        border: outline ? "2px solid #5c3317" : "none",
        borderRadius: 30,
        padding: "0.75rem 1.8rem",
        fontSize: "0.95rem",
        fontWeight: 700,
        letterSpacing: "0.05em",
        cursor: "pointer",
        transition: "background-color 0.2s, transform 0.2s",
        textTransform: "uppercase",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export default CTAButton;
