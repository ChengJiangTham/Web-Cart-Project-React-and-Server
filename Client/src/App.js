import './index.css';
import React from 'react';
import Header from './components/Header'
import Shop from './pages/Shop';
import ShopHistory from './pages/ShopHistory';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header >
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/Home" element={<Shop />} />
            <Route path="/History" element={<ShopHistory />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </div>
  );
}

export default App;
