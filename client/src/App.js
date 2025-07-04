import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Buoi1 from "./components/Buoi1/Buoi1";
import Buoi2 from "./components/Buoi2/Buoi2";
import Buoi3 from "./components/Buoi3/Buoi3";
import Buoi4 from "./components/Buoi4/Buoi4";
import ProductPage from "./Pages/ProductPage/ProductPage";

function App() {
  const [selectedSession, setSelectedSession] = useState("Buổi 1");
  const now = new Date().toLocaleString();
  localStorage.setItem("lastVisit", now);
  const lastVisit = localStorage.getItem("lastVisit");

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("lastExitTime", new Date().toLocaleString());
  });
  const lastExit = localStorage.getItem("lastExitTime");

  const renderContent = () => {
    switch (selectedSession) {
      case "Buổi 1":
        return <Buoi1 />;
      case "Buổi 2":
        return <Buoi2 />;
      case "Buổi 3":
        return <Buoi3 />;
      case "Buổi 4":
        return <Buoi4 />;
      case "Các buổi còn lại":
        return <ProductPage />;
      default:
        return <div>Chọn buổi học ở thanh bên</div>;
    }
  };

  return (
    <div className="app">
      <header className="header">CMS Learning Platform</header>
      <div className="main">
        <Sidebar
          setSelectedSession={setSelectedSession}
          selectedSession={selectedSession}
        />
        <section className="content main-content">{renderContent()}</section>
      </div>
      <footer>
        <p>Lần đăng nhập gần nhất: {lastVisit}</p>
        <p>Lần thoát gần nhất: {lastExit}</p>
      </footer>
    </div>
  );
}

export default App;
