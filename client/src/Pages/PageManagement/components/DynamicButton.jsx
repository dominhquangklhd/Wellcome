import "./DynamicButton.css";

export default function DynamicButton({ config, onAction, data }) {
  const { key, label, variant = 'default', action, disabled } = config;
  
  const handleClick = () => {
    if (typeof onAction === 'function') {
      onAction(action, data);
    }
  };

  return (
    <button
      key={key}
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
