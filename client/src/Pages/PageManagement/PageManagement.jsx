import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { pagesConfig } from './pageConfigs/pagesConfig';
import DynamicTable from './components/DynamicTable';
import DynamicForm from './components/DynamicForm';
import DynamicButton from './components/DynamicButton';
import ProductService from '../../services/ProductService';
import './PageManagement.css'; 

export default function PageManagement() {
  const { pageKey } = useParams();
  const config = pagesConfig[pageKey];

  const [formData, setFormData] = useState({});

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const loadData = async () => {
    const data = await ProductService.getAll(currentPage);
    setProducts(data.products || null);
    setTotalProducts(data.total || 0);
  };

  const handleButtonAction = async (action, row) => {
    console.log(action, row);
    
    switch (action) {
      case 'editProduct':
        setSelectedProduct(row);
        setFormData(row);
        break;

      case 'deleteProduct':
        if (window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này?')) {
          await ProductService.remove(row.id);
          const updated = products.filter(p => p.id !== row.id);
          setProducts(updated);
          loadData();
        }
        break;

      case 'updateProduct':
        if (!selectedProduct) return;
        const updatedData = { ...selectedProduct, ...formData };
        await ProductService.update(selectedProduct.id, updatedData);
        setProducts(products.map(p =>
          p.id === selectedProduct.id ? updatedData : p
        ));
        setSelectedProduct(null); // ẩn form sau khi cập nhật
        setFormData({});
        loadData();
        break;

      case 'submitAction':
        const newProduct = await ProductService.create(formData);
        setProducts([...products, newProduct]);
        setFormData({});
        loadData();
        break;

      case 'cancel':
        setSelectedProduct(null); // dùng để ẩn form edit
        setFormData({});
        break;

      default:
        console.warn(`⚠️ Chưa xử lý action: ${action}`);
    }
  };



  useEffect(() => {
    loadData();
  }, [pageKey]);

  useEffect(() => {
    ProductService.getAll(currentPage).then((data) => {
      setProducts(data.products || []);
      setTotalProducts(data.total || 0);
    });
  }, [currentPage]);

  return (
    <div>
      <h2>{config.title}</h2>
      <DynamicTable
        columns={config.table.columns}
        data={products}
        configButtons={config.buttons}
        configConfirm={config.confirmButton}
        onAction={handleButtonAction}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={totalProducts}
      />
      {selectedProduct ? (
        <div className="edit-form-container">
          <DynamicForm
            mode="update"
            fields={config.form.fields}
            formData={formData}
            setFormData={setFormData}
            configButtons={config.buttons}
            onAction={handleButtonAction}
          />
        </div>
      )
        :
        <DynamicForm
          mode='create'
          fields={config.form.fields}
          formData={formData}
          setFormData={setFormData}
          configButtons={config.buttons}
          onAction={handleButtonAction}
        />
      }

      {config.buttons?.map((btn) => (
        <DynamicButton key={btn.key} config={btn} onAction={handleButtonAction} />
      ))}
    </div>
  );
}
