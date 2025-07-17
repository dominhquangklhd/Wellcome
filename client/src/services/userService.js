import axios from 'axios';
import { BASE_URL, authHeader } from './ProductService';

export const fetchUsers = () => axios.get(`${BASE_URL}/user`, authHeader);
export const assignRole = (userId, roleId) =>
  axios.post(`${BASE_URL}/user/assign-role`, { userId, roleId }, authHeader);
export const removeRole = (userId, roleId) =>
  axios.post(`${BASE_URL}/user/remove-role`, { userId, roleId }, authHeader);
