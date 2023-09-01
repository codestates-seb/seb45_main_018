import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import CommunityPage from './pages/CommunityPage';
import CommunityPostWritePage from './pages/CommunityPostWritePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/write" element={<CommunityPostWritePage />} />
        {/* <Route element={NotFound} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
