import React from "react";
import ProductList from "./ProductList";
import "./Buoi2.css";

function Buoi2() {
  return (
    <div className="app">
      <header className="header">CMS Header</header>
      <div className="main">
        <aside className="sidebar">Sidebar</aside>
        <section className="content">
          <ProductList />
        </section>
      </div>
    </div>
  );
}

export default Buoi2;
