import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import CommunityPage from './pages/CommunityPage';
import CommunityWritePage from './pages/CommunityWritePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/write" element={<CommunityWritePage />} />
        {/* <Route element={NotFound} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
