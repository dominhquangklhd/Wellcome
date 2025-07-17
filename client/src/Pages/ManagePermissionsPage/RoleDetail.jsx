import React, { useEffect, useState } from 'react';
import {
  fetchPermissions,
  assignPermissionToRole,
  removePermissionFromRole,
  fetchRoleById,
} from '../../services/rbacService';
import { useParams } from 'react-router-dom';

export default function RoleDetail({ onUpdatePermission }) {
  const { id } = useParams(); // id của role
  const [role, setRole] = useState(null);
  const [allPermissions, setAllPermissions] = useState([]);

  const loadData = async () => {
    const roleRes = await fetchRoleById(id);
    const permissionsRes = await fetchPermissions();

    setRole(roleRes.data);
    setAllPermissions(permissionsRes.data);
    
    onUpdatePermission && onUpdatePermission(); 
  };

  const handleAssign = async (permissionId) => {
    await assignPermissionToRole(id, permissionId);
    loadData();
  };

  const handleRemove = async (permissionId) => {
    await removePermissionFromRole(id, permissionId);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (!role) return <div>Đang tải...</div>;

  const assignedIds = role.permissions.map((p) => p.id);

  return (
    <div>
      <h2>Chi tiết Role: {role.name}</h2>

      <h3>Permission đã gán:</h3>
      <ul>
        {role.permissions.map((perm) => (
          <li key={perm.id}>
            {perm.action}{' '}
            <button onClick={() => handleRemove(perm.id)}>Gỡ</button>
          </li>
        ))}
      </ul>

      <h3>Permission chưa gán:</h3>
      <ul>
        {allPermissions
          .filter((p) => !assignedIds.includes(p.id))
          .map((perm) => (
            <li key={perm.id}>
              {perm.action}{' '}
              <button onClick={() => handleAssign(perm.id)}>Gán</button>
            </li>
          ))}
      </ul>
    </div>
  );
}
