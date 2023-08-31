// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Main from './pages/Main';
import Footer from './components/atoms/Footer';
import Header from './components/atoms/Header';

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Main />} />
       {/* <Route element={NotFound} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
