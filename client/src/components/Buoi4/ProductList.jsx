function ProductList({ products, onDelete, onEdit, editingProduct, setEditingProduct }) {
    return (
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
                {products.map((p) => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        {editingProduct && editingProduct.id === p.id ?
                            <>
                                <td>
                                    <input
                                        placeholder="Tên sản phẩm"
                                        value={editingProduct.name}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <input
                                        placeholder="Giá sản phẩm"
                                        value={editingProduct.price}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                    />
                                </td>
                            </> :
                            <>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                            </>}
                        <td>
                            {editingProduct && editingProduct.id === p.id ?
                                <button onClick={() => onEdit(editingProduct)}>
                                    Cập nhật
                                </button>
                                :
                                <button onClick={() => onEdit(p)}>
                                    Sửa
                                </button>
                            }
                            <button onClick={() => onDelete(p.id)}>Xoá</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ProductList;
