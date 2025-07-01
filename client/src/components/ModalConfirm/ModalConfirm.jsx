export default function ModalConfirm({ open, onClose, onConfirm, message }) {
  if (!open) return null;

  return (
    <div className="modal">
      <p>{message}</p>
      <button onClick={onConfirm}>Xác nhận</button>
      <button onClick={onClose}>Huỷ</button>
    </div>
  );
}
