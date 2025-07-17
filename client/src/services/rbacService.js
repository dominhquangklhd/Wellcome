import axios from 'axios';
import { authHeader, BASE_URL } from './ProductService';

export const fetchRoles = () => axios.get(`${BASE_URL}/role`, authHeader);
export const createRole = (name) => axios.post(`${BASE_URL}/role/create`, { name }, authHeader);

export const fetchPermissions = () => axios.get(`${BASE_URL}/permission`, authHeader);
export const createPermission = (action, description) =>
  axios.post(`${BASE_URL}/permission/create`, { action, description }, authHeader);

export const fetchRoleById = (id) =>
  axios.get(`${BASE_URL}/role/${id}`, authHeader);

export const assignPermissionToRole = (roleId, permissionId) =>
  axios.post(`${BASE_URL}/role/${roleId}/assign-permission`, { roleId, permissionId }, authHeader);

export const removePermissionFromRole = (roleId, permissionId) =>
  axios.post(`${BASE_URL}/role/${roleId}/remove-permission`, { roleId, permissionId }, authHeader);

