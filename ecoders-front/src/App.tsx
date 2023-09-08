// import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Main from './pages/Main';
import Footer from './components/atoms/Footer';
import Header from './components/atoms/Header';
import MyInfo from './pages/Myinfo';
import Service from './pages/Service';
import Contact from './pages/Contact';
import Ecohabit from './pages/Ecohabit';
import CommunityPage from './pages/CommunityPage';
import CommunityPostWritePage from './pages/CommunityPostWritePage';
import CommunityPostDetailPage from './pages/CommunityPostDetailPage';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';

function App() {


  return (
    <>
      {' '}
      <BrowserRouter>
        <Header />

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/myinfo" element={<MyInfo />} />
            <Route path="/service" element={<Service />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/eco-habit" element={<Ecohabit />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
          <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/postwrite" element={<CommunityPostWritePage />} />
        <Route path="/community/postdetail/:postnumber" element={<CommunityPostDetailPage />} />
        {/* <Route element={NotFound} /> */}
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
    
  );
}

export default App;
