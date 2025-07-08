import { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import ProductList from "../../components/ProductList/ProductList";
import ProductService from "../../services/ProductService";

export default function SearchPage({ products, onDelete, onEdit, editingProduct, setEditingProduct }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            try {
                const res = await ProductService.search(searchTerm, currentPage);
                setFilteredProducts(res.products);
                setTotalProducts(res.total);
            } catch (error) {
                console.error('Lỗi tìm kiếm:', error);
            }
        };

        fetchFilteredProducts();
    }, [searchTerm, currentPage]);

    return (
        <>
            <Input
                placeholder={"Tên sản phẩm cần tìm"}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
                }}
                value={searchTerm}
            />

            {totalProducts > 0 ? (
                <>
                    <ProductList
                        products={filteredProducts}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        editingProduct={editingProduct}
                        setEditingProduct={setEditingProduct}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalProducts={totalProducts}
                    />
                </>
            ) : (
                <div>Không tồn tại sản phẩm</div>
            )}
        </>
    );
}
