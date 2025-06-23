import React from "react";

function ProductList({ products }) {
  return (
    <table border="1" cellPadding="10" cellSpacing="0" style={{marginTop: "10px"}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{p.name}</td>
            <td>{p.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;
