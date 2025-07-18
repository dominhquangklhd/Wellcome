import axios from 'axios';

const isProd = window.location.hostname !== 'localhost';

const API_URL = isProd
  ? 'https://wellcome-ynlb.onrender.com/api/products'
  : 'http://localhost:1337/api/products';

export const BASE_URL = isProd
  ? 'https://wellcome-ynlb.onrender.com'
  : 'http://localhost:1337';

export const authHeader = {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
};

const ProductService = {
  // Lấy danh sách sản phẩm
  getAll: async (currentPage) => {
    const res = await axios.get(`${API_URL}?page=${currentPage}`, authHeader);
    return res.data;
  },

  // Lấy một sản phẩm theo id
  getById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`, authHeader);
    return res.data;
  },

  // Thêm sản phẩm mới
  create: async (product) => {
    const res = await axios.post(API_URL, product, authHeader);
    return res.data;
  },

  // Cập nhật sản phẩm
  update: async (id, product) => {
    const res = await axios.put(`${API_URL}/${id}`, product, authHeader);
    return res.data;
  },

  // Xóa sản phẩm
  remove: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`, authHeader);
    return res.data;
  },

  search: async (searchTerm, currentPage) => {
    const res = await axios.get(`${API_URL}?search=${searchTerm}&page=${currentPage}`, authHeader);
    return res.data;
  },

  login: async (email, password) => {
    const res = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return res.data;
  },

  signup: async (email, password) => {
    const res = await axios.post(`${BASE_URL}/auth/signup`, {
      email,
      password,
    });
    return res.data;
  },
};

export default ProductService;
