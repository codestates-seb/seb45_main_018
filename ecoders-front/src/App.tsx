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
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login, logout } from './redux/slice/loginSlice';
import { setAccessToken, setRefreshToken, setId, setProfileImg, setTempUsername } from './redux/slice/userSlice';
import PageWrapper from './PageWrapper';
import { useSelector } from 'react-redux';
import { setUsername, setEmail } from './redux/slice/userSlice';
import { RootState } from './redux/store/store';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();

  const APIURL = useSelector((state: RootState) => state.api.APIURL);
  const email = useSelector((state: RootState) => state.user.email);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const getUser = () => {
      axios
        .get(`${APIURL}/members/my-info`, {
          headers: {
            Authorization: accessToken,
            'Refresh-Token': refreshToken,
          },
        })
        .then(res => {
          dispatch(setUsername(res.data.username));
          dispatch(setTempUsername(res.data.username));
          dispatch(setEmail(res.data.email));
          dispatch(setProfileImg(res.data.imageUrl));
          dispatch(setId(res.data.id));
          console.log('유저 정보를 성공적으로 불러왔습니다.');
        })
        .catch(error => {
          console.log(error, '데이터를 불러오는데 실패했습니다.');
        });
    };

    const getToken = () => {
      //userslice id와 token을 가져와야함.

      if (accessToken && refreshToken) {
        dispatch(login());
        dispatch(setAccessToken(accessToken));
        dispatch(setRefreshToken(refreshToken));

        console.log('로그인하여 토큰을 성공적으로 저장하였습니다.');
      } else {
        dispatch(logout());
        console.log('로그아웃하였습니다.');
      }
    };
    getToken();
    getUser();
    console.log(email);
  }, []);

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
            {/* <Route path="/chat" element={<Chat />} /> */}
            <Route path="/community/postwrite" element={<CommunityPostWritePage />} />
            <Route path="/community/postdetail/:postnumber" element={<CommunityPostDetailPage />} />
            {/* <Route element={NotFound} /> */}
          </Routes>
        </PageWrapper>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
