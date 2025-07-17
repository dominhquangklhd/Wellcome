// src/config/pagesConfig.js

import { BASE_URL, authHeader } from '../../../services/ProductService';

export const pagesConfig = {
  products: {
    title: 'Quản lý sản phẩm',
    table: {
      fetchUrl: `${BASE_URL}/api/products`,
      columns: ['name', 'price'],
    },
    form: {
      fields: [
        { name: 'name', label: 'Tên sản phẩm', type: 'text' },
        { name: 'price', label: 'Giá', type: 'number' },
      ],
      submitUrl: `${BASE_URL}/api/products`,
      method: 'POST',
    },
    buttons: [
      {
        key: 'create',
        label: 'Thêm sản phẩm',
        variant: 'primary',
        action: 'openFormModal',
      },
      {
        key: 'refresh',
        label: 'Làm mới',
        variant: 'ghost',
        action: 'refreshTableData',
      },
      {
        key: 'export',
        label: 'Xuất Excel',
        variant: 'success',
        action: 'exportToExcel',
      },
    ],
    authHeader,
  },
};
