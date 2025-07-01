export default function Input({ value, onChange, placeholder }) {
  return (
    <input
      className="input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
