import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import './ProductPage.css'

import ProductService from '../../services/ProductService';
import ProductForm from '../../components/ProductForm/ProductForm';
import ProductList from '../../components/ProductList/ProductList';
import AboutPage from '../AboutPage/AboutPage';
import Button from '../../components/Button/Button';
import SearchPage from '../SearchPage/SearchPage';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAll();
        setProducts(data);
      } catch (error) {
        console.error('Lỗi lấy danh sách:', error);
      }
    };
    fetchProducts();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleAddProduct = async (product) => {
    try {
      const newProduct = await ProductService.create(product);
      setProducts((products) => [...products, newProduct]);
    } catch (error) {
      console.error('Lỗi thêm sản phẩm:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await ProductService.remove(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Lỗi xoá sản phẩm:', error);
    }
  };

  const handleEditProduct = async (product) => {
    try {
      if (editingProduct) {
        await ProductService.update(editingProduct.id, product);
        setProducts(products.map(p => p.id === product.id ? product : p));
        setEditingProduct(null);
      } else {
        setEditingProduct(product);
      }
    } catch (error) {
      console.error('Lỗi cập nhật sản phẩm:', error);
    }
  };

  return (
    <div className="app">
      <header className="header header-productpage">
        CMS Header
        <Button
          children={<>Chuyển theme ({theme === 'light' ? 'Sáng' : 'Tối'})</>}
          onClick={toggleTheme}
          className={'theme-button'}
        />
      </header>
      <div className="main-buoi2">
        <aside className="sidebar">
          <Link to="/products">
            <Button children={<>Sản phẩm</>} />
          </Link>
          <Link to="/add">
            <Button children={<>Thêm</>} />
          </Link>
          <Link to="/about">
            <Button children={<>Giới thiệu</>} />
          </Link>
          <Link to="/search">
            <Button children={<>Tìm kiếm</>} />
          </Link>
        </aside>
        <section className="content">
          <h1>Quản lý sản phẩm</h1>
          <Routes>
            <Route path="/products" element={
              <ProductList
                products={products}
                onDelete={handleDeleteProduct}
                onEdit={handleEditProduct}
                editingProduct={editingProduct}
                setEditingProduct={setEditingProduct}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />} />
            <Route path="/add" element={<ProductForm onAddProduct={handleAddProduct} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/search" element={
              <SearchPage
                products={products}
                onDelete={handleDeleteProduct}
                onEdit={handleEditProduct}
                editingProduct={editingProduct}
                setEditingProduct={setEditingProduct}
              />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default ProductPage;