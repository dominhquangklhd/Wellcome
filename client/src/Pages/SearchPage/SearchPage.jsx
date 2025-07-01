import { useMemo, useState } from "react";
import Input from "../../components/Input/Input";
import ProductList from "../../components/ProductList/ProductList";

export default function SearchPage({ products, onDelete, onEdit, editingProduct, setEditingProduct }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = useMemo(() => {
        return products.filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

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

            {filteredProducts.length > 0 ? (
                <>
                    <ProductList
                        products={filteredProducts}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        editingProduct={editingProduct}
                        setEditingProduct={setEditingProduct}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            ) : (
                <div>Không tồn tại sản phẩm</div>
            )}
        </>
    );
}
