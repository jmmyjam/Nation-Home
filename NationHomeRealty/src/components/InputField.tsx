import { useState } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (id: string, val: string) => void;
  placeholder?: string;
  required?: boolean;
}

function InputField({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={styles.fieldWrap}>
      <label htmlFor={id} style={styles.label}>
        {label}
        {required && <span style={styles.required}> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          ...styles.input,
          borderColor: focused ? "#5c3317" : "#d6cfc4",
          boxShadow: focused ? "0 0 0 3px rgba(92,51,23,0.12)" : "none",
        }}
      />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  fieldWrap: { display: "flex", flexDirection: "column", gap: "0.4rem" },
  label: { fontSize: "0.875rem", fontWeight: 600, color: "#2c1a0e" },
  required: { color: "#5c3317" },
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

export default InputField;
