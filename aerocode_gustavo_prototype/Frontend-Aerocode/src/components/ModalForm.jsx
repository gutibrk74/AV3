export default function ModalForm({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>

        <h3>{title}</h3>

        <div style={{ marginTop: 12 }}>
          {children}
        </div>

      </div>
    </div>
  )
}
