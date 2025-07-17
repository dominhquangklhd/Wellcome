import React, { useEffect, useState } from 'react';
import { fetchRoles, createRole } from '../../services/rbacService';
import { fetchUsers, assignRole, removeRole } from '../../services/userService';
import './ManageRoles.css';

export default function ManageRoles() {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  const loadAll = async () => {
    const resRoles = await fetchRoles();
    const resUsers = await fetchUsers();
    setRoles(resRoles.data);
    setUsers(resUsers.data);
  };

  const handleCreate = async () => {
    if (!name) return;
    await createRole(name);
    setName('');
    loadAll();
  };

  const toggleUserRole = async (userId, roleId, hasRole) => {
    if (hasRole) {
      await removeRole(userId, roleId);
    } else {
      await assignRole(userId, roleId);
    }
    loadAll();
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div className="manage-container">
      <h2 className="manage-title">Quản lý Roles</h2>

      <div>
        <input
          type="text"
          value={name}
          placeholder="Nhập tên role mới"
          onChange={(e) => setName(e.target.value)}
          className="manage-input"
        />
        <button onClick={handleCreate} className="manage-button">
          Thêm
        </button>
      </div>

      <div className="manage-section">
        <h3>Danh sách người dùng</h3>
        {users.map((user) => (
          <div key={user.id} className="manage-user">
            <strong>{user.email}</strong>
            <div className="manage-role-checkboxes">
              {roles.map((role) => {
                const hasRole = user.roles.some((r) => r.id === role.id);
                return (
                  <label key={role.id}>
                    <input
                      type="checkbox"
                      checked={hasRole}
                      onChange={() => toggleUserRole(user.id, role.id, hasRole)}
                    />
                    {role.name}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
