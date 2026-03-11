import { useState } from "react";

interface SelectFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (id: string, val: string) => void;
  options: string[];
}

function SelectField({
  label,
  id,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={styles.fieldWrap}>
      <label htmlFor={id} style={styles.label}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...styles.input,
          borderColor: focused ? "#5c3317" : "#d6cfc4",
          boxShadow: focused ? "0 0 0 3px rgba(92,51,23,0.12)" : "none",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  fieldWrap: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  label: { fontSize: "0.875rem", fontWeight: 600, color: "#2c1a0e" },
  input: {
    border: "1.5px solid #d6cfc4",
    borderRadius: 10,
    padding: "0.65rem 0.9rem",
    fontSize: "0.95rem",
    color: "#2c1a0e",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    width: "100%",
  },
};

export default SelectField;
