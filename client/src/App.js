import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Buoi1 from "./components/Buoi1/Buoi1";
import Buoi2 from "./components/Buoi2/Buoi2";
import Buoi3 from "./components/Buoi3/Buoi3";

function App() {
  const [selectedSession, setSelectedSession] = useState("Buổi 1");

  const renderContent = () => {
    switch (selectedSession) {
      case "Buổi 1":
        return <Buoi1 />;
      case "Buổi 2":
        return <Buoi2 />;
      case "Buổi 3":
      return <Buoi3 />;
      default:
        return <div>Chọn buổi học ở thanh bên</div>;
    }
  };

  return (
    <div className="app">
      <header className="header">CMS Learning Platform</header>
      <div className="main">
        <Sidebar setSelectedSession={setSelectedSession} selectedSession={selectedSession}/>
        <section className="content">{renderContent()}</section>
      </div>
    </div>
  );
}

export default App;
