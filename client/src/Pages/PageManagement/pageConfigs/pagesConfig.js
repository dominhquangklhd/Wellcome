// src/config/pagesConfig.js
export const pagesConfig = {
  products: {
    title: "Quản lý sản phẩm",
    table: {
      columns: ["id", "name", "price", "actions"],
    },
    form: {
      fields: [
        { name: "name", label: "Tên sản phẩm", type: "text" },
        { name: "price", label: "Giá", type: "number" },
      ],
    },
    buttons: [
      {
        key: "edit",
        label: "Sửa",
        variant: "primary",
        action: "editProduct",
      },
      {
        key: "update",
        label: "Cập nhật",
        variant: "primary",
        action: "updateProduct",
      },
      {
        key: "delete",
        label: "Xoá",
        variant: "delete",
        action: "deleteProduct",
      },
      {
        key: "cancel",
        label: "Hủy",
        variant: "ghost",
        action: "cancel",
      },
      {
        key: "submit",
        label: "Xác nhận",
        variant: "submit",
        action: "submitAction",
      },
    ],
  },
};
