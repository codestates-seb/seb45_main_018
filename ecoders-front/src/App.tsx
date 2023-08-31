// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Main from './pages/Main';
import Footer from './components/atoms/Footer';
import Header from './components/atoms/Header';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <div className="body-container">
          <Routes>
            <Route path="/" element={<Main />} />
            {/* <Route element={NotFound} /> */}
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
