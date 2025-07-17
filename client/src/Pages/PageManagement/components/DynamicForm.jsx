import React from 'react';

export default function DynamicForm({ fields, formData, setFormData, onSubmit }) {
  return (
    <div>
      <h3>Thêm mới</h3>
      {fields.map(field => (
        <div key={field.name}>
          <label>{field.label}:</label>
          <input
            type={field.type}
            value={formData[field.name] || ''}
            onChange={(e) =>
              setFormData(prev => ({ ...prev, [field.name]: e.target.value }))
            }
          />
        </div>
      ))}
      <button onClick={onSubmit}>Gửi</button>
    </div>
  );
}
