import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import './ProductPage.css'

import ProductService from '../../services/ProductService';
import ProductForm from '../../components/ProductForm/ProductForm';
import ProductList from '../../components/ProductList/ProductList';
import AboutPage from '../AboutPage/AboutPage';
import Button from '../../components/Button/Button';
import SearchPage from '../SearchPage/SearchPage';
import { Modal } from '../../components/Modal/Modal';
import SignupForm from '../../components/SignupForm/SignupForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import usePermission from '../../hooks/usePermission';
import ManageRoles from '../ManageRolesPage/ManageRoles';
import ManagePermissions from '../ManagePermissionsPage/ManagePermissions';
import PageManagement from '../PageManagement/PageManagement';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const { can } = usePermission();

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem("permissions");
    setIsLogin(false);
    window.location.href = '/products';
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLogin(true);
    console.log(products);

  }, []);

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
        const data = await ProductService.getAll(currentPage);
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (error) {
        console.error('Lỗi lấy danh sách:', error);
      }
    };
    fetchProducts();
  }, [currentPage]);

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
        {!isLogin ?
          <div>
            <button onClick={() => setShowLogin(true)} className="auth-button">
              Đăng nhập
            </button>
            <button onClick={() => setShowSignup(true)} className="auth-button">
              Đăng ký
            </button>
          </div>
          :
          <div>
            <button onClick={handleLogout} className="auth-button">
              Đăng xuất
            </button>
          </div>
        }

      </header>
      <div className="main-buoi2">
        {showLogin && (
          <Modal onClose={() => setShowLogin(false)}>
            <LoginForm setIsLogin={setIsLogin} />
          </Modal>
        )}

        {showSignup && (
          <Modal onClose={() => setShowSignup(false)}>
            <SignupForm />
          </Modal>
        )}
        <aside className="sidebar">
          {can('view_product') &&
            <>
              <Link to="/products">
                <Button children={<>Sản phẩm</>} />
              </Link>
              <Link to="/search">
                <Button children={<>Tìm kiếm</>} />
              </Link>
            </>
          }
          {
            can('add_product') &&
            <Link to="/add">
              <Button children={<>Thêm</>} />
            </Link>
          }
          <Link to="/about">
            <Button children={<>Giới thiệu</>} />
          </Link>
          {
            can('manage_roles') &&
            <Link to="/manage-roles">
              <Button children={<>Quản lý Roles</>} />
            </Link>
          }
          {
            can('manage_permissions') &&
            <Link to="/manage-permissions">
              <Button children={<>Quản lý Permissions</>} />
            </Link>
          }
          {
            can('manage_pages') &&
            <>
              <Link to="/page/products">
                <Button children={<>Quản lý Pages Sản phẩm</>} />
              </Link>
              {/* <Link to="/page/users">
                <Button children={<>Quản lý Pages User</>} />
              </Link> */}
            </>
          }
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
                totalProducts={totalProducts}
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
            <Route path="/manage-roles" element={<ManageRoles />} />
            <Route path="/manage-permissions/*" element={<ManagePermissions />} />
            <Route path="/page/:pageKey" element={<PageManagement />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default ProductPage;