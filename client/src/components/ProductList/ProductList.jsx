import { useMemo } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";

function ProductList({ products, onDelete, onEdit, editingProduct, setEditingProduct, currentPage, setCurrentPage }) {
    const itemsPerPage = 5;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return products.slice(start, start + itemsPerPage);
    }, [products, currentPage]);

    return (
        <>
            <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: 10 }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedProducts.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            {editingProduct && editingProduct.id === p.id ?
                                <>
                                    <td>
                                        <Input
                                            value={editingProduct.name}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                            placeholder={"Tên sản phẩm"}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            value={editingProduct.price}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                            placeholder={"Giá sản phẩm"}
                                        />
                                    </td>
                                </> :
                                <>
                                    <td>{p.name}</td>
                                    <td>{p.price}</td>
                                </>}
                            <td>
                                {editingProduct && editingProduct.id === p.id ?
                                    <Button
                                        children={<>Cập nhật</>}
                                        onClick={() => onEdit(editingProduct)}
                                    />
                                    :
                                    <Button
                                        children={<>Sửa</>}
                                        onClick={() => onEdit(p)}
                                    />
                                }
                                <Button
                                    children={<>Xóa</>}
                                    onClick={() => onDelete(p.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Nút chuyển trang */}
            <div style={{ marginTop: "16px" }}>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        style={{
                            margin: "0 4px",
                            fontWeight: currentPage === i + 1 ? "bold" : "normal"
                        }}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </>
    );
}

export default ProductList;
