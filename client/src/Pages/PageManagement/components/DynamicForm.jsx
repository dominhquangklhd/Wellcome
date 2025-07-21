import React from 'react';
import './DynamicForm.css';
import DynamicButton from './DynamicButton';

export default function DynamicForm({ mode = 'create', fields, configButtons, formData, setFormData, onAction }) {
  const isEditMode = mode === 'update';
  const cancelButtonConfig = configButtons?.find(btn => btn.key === 'cancel');
  const submitKey = isEditMode ? 'update' : 'submit';
  const submitButtonConfig = configButtons.find(btn => btn.key === submitKey);

  return (
    <div className="form-container">
      <h3 className="form-title">{isEditMode ? 'Chỉnh sửa' : 'Thêm mới'}</h3>
      <form
        className="form-grid"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {fields.map(field => (
          <div className="form-group" key={field.name}>
            <label htmlFor={field.name} className="form-label">{field.label}</label>
            <input
              id={field.name}
              type={field.type}
              className="form-input"
              value={formData[field.name] || ''}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, [field.name]: e.target.value }))
              }
            />
          </div>
        ))}
        <div className="form-actions">
          {submitButtonConfig && (
            <DynamicButton
              config={submitButtonConfig}
              onAction={onAction}
              data={formData}
            />
          )}

          {isEditMode && (
            <DynamicButton
              config={cancelButtonConfig}
              onAction={onAction}
            />
          )}
        </div>
      </form>
    </div>
  );
}
