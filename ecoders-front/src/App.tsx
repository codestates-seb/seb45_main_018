// import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Footer from './components/atoms/Footer';
import Header from './components/atoms/Header';
import MyInfo from './pages/Myinfo';
import Service from './pages/Service';
import Contact from './pages/Contact';
import Ecohabit from './pages/Ecohabit';
import CommunityPage from './pages/CommunityPage';
// import CommunityPostWritePage from './pages/CommunityPostWritePage';
import CommunityPostDetailPage from './pages/CommunityPostDetailPage';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import Chat from './pages/Chat/Chat';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login, logout } from './redux/slice/loginSlice';
import { setAccessToken, setRefreshToken, setId } from './redux/slice/userSlice';
import PageWrapper from './PageWrapper';
import GoogleSignIn from './pages/GoogleLogin';


function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const id = localStorage.getItem('id');

    //userslice id와 token을 가져와야함.

    if (accessToken) {
      dispatch(login());
      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
      // dispatch(setUsername(username));
      dispatch(setId(id));
    } else {
      dispatch(logout());
    }
  }, [dispatch])


  

  return (
    <>
      <BrowserRouter>
        <Header />
        <PageWrapper>
        <Routes>
          
          <Route path="/" element={<Main />} />
          <Route path="/myinfo" element={<MyInfo />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/eco-habit" element={<Ecohabit />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="/community/postwrite" element={<CommunityPostWritePage />} /> */}
          <Route path="/community/postdetail/:postnumber" element={<CommunityPostDetailPage />} />
          {/* <Route element={NotFound} /> */}
        </Routes>
        </PageWrapper>
        <GoogleSignIn />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
