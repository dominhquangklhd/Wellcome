import React, { useEffect, useState } from "react";
import axios from "axios";

function Buoi1() {
  const [pongMessage, setPongMessage] = useState("");
  const isProd = window.location.hostname !== 'localhost';

  const API_URL = isProd
    ? 'https://wellcome-ynlb.onrender.com/api/ping'
    : 'http://localhost:1337/api/ping';


  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setPongMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error calling ping API:", error);
        setPongMessage("Lỗi khi gọi API");
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to My CMS</h1>
      <h2>{pongMessage}</h2>
    </div>
  );
}

export default Buoi1;
