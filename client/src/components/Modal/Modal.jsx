import './Modal.css';

export function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button onClick={onClose} className="close-button">✖</button>
        {children}
      </div>
    </div>
  );
};