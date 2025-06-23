function ProductList() {
  const products = [
    { id: 1, name: "Product A", price: "$100" },
    { id: 2, name: "Product B", price: "$150" },
    { id: 3, name: "Product C", price: "$200" },
  ];

  return (
    <div>
      <h2>Product List</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
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
    </div>
  );
}

export default ProductList;