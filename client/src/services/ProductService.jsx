import axios from 'axios';

const API_URL = 'http://localhost:1337/api/products';

const ProductService = {
  // Lấy danh sách sản phẩm
  getAll: async () => {
    const res = await axios.get(API_URL);
    return res.data;
  },

  // Lấy một sản phẩm theo id
  getById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  // Thêm sản phẩm mới
  create: async (product) => {
    const res = await axios.post(API_URL, product);
    return res.data;
  },

  // Cập nhật sản phẩm
  update: async (id, product) => {
    const res = await axios.put(`${API_URL}/${id}`, product);
    return res.data;
  },

  // Xóa sản phẩm
  remove: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  },
};

export default ProductService;
