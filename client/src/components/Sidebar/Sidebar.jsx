import React from "react";
import "./Sidebar.css"; // nếu muốn tách CSS

function Sidebar({ setSelectedSession, selectedSession }) {
  const sessions = ["Buổi 1", "Buổi 2", "Buổi 3"];

  return (
    <aside className="sidebar">
      <h3>Danh sách buổi học</h3>
      <ul>
        {sessions.map((session) => (
          <li key={session}>
            <button 
              className={session === selectedSession ? "active" : ""}
              onClick={() => setSelectedSession(session)}>
              {session}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
