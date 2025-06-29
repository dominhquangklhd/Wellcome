import React, { useState } from "react";

function ProductForm({ onAddProduct }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [nextId, setNextId] = useState(4);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !price) return;

        onAddProduct({ id: nextId, name, price });
        setNextId(nextId + 1);
        setName("");
        setPrice("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Giá"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button type="submit">
                Thêm
            </button>
        </form>
    );
}

export default ProductForm;
