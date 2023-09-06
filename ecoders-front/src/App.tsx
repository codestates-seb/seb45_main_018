import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import CommunityPage from './pages/CommunityPage';
import CommunityPostWritePage from './pages/CommunityPostWritePage';
import CommunityPostDetailPage from './pages/CommunityPostDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/postwrite" element={<CommunityPostWritePage />} />
        <Route path="/community/postdetail/:postnumber" element={<CommunityPostDetailPage />} />
        {/* <Route element={NotFound} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
