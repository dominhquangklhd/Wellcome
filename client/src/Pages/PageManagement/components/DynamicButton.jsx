export default function DynamicButton({ config, onAction }) {
  const { key, label, variant = 'default', action, disabled } = config;

  const handleClick = () => {
    if (typeof onAction === 'function') {
      onAction(action);
    }
  };

  return (
    <button
      key={key}
      variant={variant}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
