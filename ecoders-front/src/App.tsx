// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Main from './pages/Main';
import Footer from './components/atoms/Footer';
import Header from './components/atoms/Header';
import MyInfo from './pages/Myinfo';
import Service from './pages/Service';
import Contact from './pages/Contact';

function App() {
  return (
    <>      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/myinfo" element={<MyInfo />} />
            <Route path="/service" element={<Service />}/>
            <Route path="/contact" element={<Contact />}/>

            {/* <Route element={NotFound} /> */}
          </Routes>
      </BrowserRouter>
      <Footer />
      </>
  );
}

export default App;
