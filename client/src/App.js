import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [pongMessage, setPongMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:1337/api/ping')
      .then(response => {
        setPongMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error calling ping API:', error);
        setPongMessage('Lỗi khi gọi API');
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to My CMS</h1>
      <h2>{pongMessage}</h2>
    </div>
  );
}

export default App;
