import React, { useState } from "react";
import "../Buoi2/Buoi2.css";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

function Buoi4() {
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", price: "$100" },
    { id: 2, name: "Product B", price: "$150" },
    { id: 3, name: "Product C", price: "$200" },
  ]);

  const [editingProduct, setEditingProduct] = useState({ id: "", name: "", price: "" });

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEditProduct = (product) => {
    if (editingProduct.id) {
      // Cập nhật
      setProducts(products.map(p => p.id === product.id ? product : p));
      setEditingProduct({ id: "", name: "", price: "" });
    } else {
      setEditingProduct(product);
    }
  };

  return (
    <div className="app">
      <header className="header">CMS Header</header>
      <div className="main-buoi2">
        <aside className="sidebar">Sidebar</aside>
        <section className="content">
          <h1>Quản lý sản phẩm</h1>
          <ProductForm
            onAddProduct={handleAddProduct}
          />
          <ProductList
            products={products}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
          />
        </section>
      </div>
    </div>
  );
}

export default Buoi4;