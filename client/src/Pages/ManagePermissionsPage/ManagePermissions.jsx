import React, { useEffect, useState } from 'react';
import { fetchPermissions, createPermission, fetchRoles } from '../../services/rbacService';
import { Link, Route, Routes } from 'react-router-dom';
import './ManagePermissions.css';
import RoleDetail from './RoleDetail';

export default function ManagePermissions() {
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [action, setAction] = useState('');
  const [description, setDescription] = useState('');

  const loadPermissions = async () => {
    const res = await fetchPermissions();
    const resRoles = await fetchRoles();
    setPermissions(res.data);
    setRoles(resRoles.data);
  };

  const handleCreate = async () => {
    if (!action) return;
    await createPermission(action, description);
    setAction('');
    loadPermissions();
  };

  useEffect(() => {
    loadPermissions();
  }, []);

  return (
    <div className="manage-container">
      <h2 className="manage-title">Quản lý Permissions</h2>
      <div>
        <input
          type="text"
          value={action}
          placeholder="Tên quyền (vd: view_product)"
          onChange={(e) => setAction(e.target.value)}
          className="manage-input"
        />
        <input
          type="text"
          value={description}
          placeholder="Mô tả quyền"
          onChange={(e) => setDescription(e.target.value)}
          className="manage-input"
        />
        <button onClick={handleCreate} className="manage-button">
          Thêm
        </button>
      </div>

      
      <Routes>
        <Route path="/" element={
          <ul className="manage-list">
            {roles.map((role) => (
              <li key={role.id}>
                {role.name}
                <Link to={`./${role.id}`} style={{ marginLeft: 10 }}>
                  Xem chi tiết
                </Link>
              </li>
            ))}
          </ul>
        } />
        <Route path="/:id" element={<RoleDetail onUpdatePermission={loadPermissions} />} />
      </Routes>
    </div>
  );
}
