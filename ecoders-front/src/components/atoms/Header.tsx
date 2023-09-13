import styled from 'styled-components';
import logo from '../../assets/Logo.png';
import { useDispatch } from 'react-redux';
// import { login } from '../../redux/slice/loginSlice';
import { logout } from '../../redux/slice/loginSlice';
import profileImg from '../../assets/ProfileImage.svg';
import { useSelector } from 'react-redux';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { setUsername, setStamp } from '../../redux/slice/userSlice';
import { RootState } from '../../redux/store/store';
import Modal from './Modal';
import { openModal, closeModal } from "../../redux/slice/modalSlice";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const memberId = useSelector((state: RootState) => state.user.id);
  const username = useSelector((state: RootState) => state.user.username); // username 상태 가져오기
  const stamp = useSelector((state: RootState) => state.user.stamp); // stamp 상태 가져오기
  const APIURL = useSelector((state: RootState) => state.api.APIURL);


  // logout: {APIURL}/auth/logout -> delete -> accesstoken, refreshtoken, Id 요청
  // Header css : 재설정
  // main 이미지 수정

  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const response = await axios.get(`${APIURL}/member`);
      //   if (response.status === 200) {
      //     const { username, stamp } = response.data;
      //     console.log(username, stamp)
      //     console.log(response.data)
      //     dispatch(setUsername(username));
      //     // dispatch(setStamp(`${stamp}`));
      //     console.log(username)
      //     navigate('/');
      //   }
      // }

      try {
        axios.get(`${APIURL}/members/${memberId}`).then(response => {
          // const { username, stamp } = response.data;
          console.log(response.data);
          console.log(username, stamp); // 이렇게 같은 스코프 내에서 호출
          dispatch(setUsername(response.data['username']));
          dispatch(setStamp(response.data['stamp']));
          console.log(username, stamp); // 이렇게 같은 스코프 내에서 호출
        });
      } catch (error: any) {
        if (error.response?.status === 401) {
          alert('로그인에 실패했습니다.');
        } else {
          alert('서버 오류가 발생했습니다.');
          console.error('로그인 에러:', error);
        }
      }
    };

    fetchData(); // 비동기 함수 실행
  }, [isLoggedIn]);

  //   try {
  //     const response = await axios.get(`${APIURL}/member`);

  //     if (response.status === 200) {
  //       const { username, stamp } = response.data;
  //       // (수정사항) 1. 다시 user 정보 get 새로..
  //       // (수정사항) 2. 유저정보조회 시: id로 검색

  //       dispatch(setUsername(username));
  //       dispatch(setStamp(stamp));

  //       navigate('/');
  //     }
  //   } catch (error: any) {
  //     if(error.response.status === 401) {
  //       alert('로그인에 실패했습니다.')
  //     } else {
  //     alert('서버 오류가 발생했습니다.');
  //     console.error('로그인 에러:', error); }
  //   }
  // };

  // const handleLogin = () => {
  //   dispatch(login());
  // }

  const handleLogout = () => {
    navigate('/login');
    dispatch(logout());
  };

  const navigateToMain = () => {
    navigate('/');
  };

  const navigateToMyInfo = () => {
    navigate('/myinfo');
  };

  const navigateToSignUp = () => {
    navigate('/signup');
  };

  const modalcloseHandler = () => {
  dispatch(closeModal('loginModal'));
  navigate('/login')
  };

  const loginModalState = useSelector((state:RootState) => state.modal.modals.loginModal)

  //chatting 구현 이후 살리기
  // useEffect(()=> {
  //   if(!loginModalState) {
  //     navigate('/login')
  //   }
  // }, [loginModalState]);
  
  const modalOpenHandler = () => {
    dispatch(openModal('loginModal'));
  };
  return (
    <>
    <Entire>
      <HeaderContainer>
        <MenuContainer>
          <HeaderLogo src={logo} onClick={navigateToMain} />
          <HeaderLogoText onClick={navigateToMain}>POLARECO</HeaderLogoText>
          <MenuTabContainer>
            <MenuTab
              onClick={() => {
                navigate('/service');
              }}>
              Services
            </MenuTab>

            {isLoggedIn ? (
              <MenuTab
                onClick={() => {
                  navigate('/eco-habit');
                }}>
                Eco-Habit
              </MenuTab>
            ) : (
              <>
              <MenuTab  
                onClick={() => {modalOpenHandler();}}>
                  
                Eco-Habit
              </MenuTab>
              </>
            )}

            <MenuTab
              onClick={() => {
                navigate('community');
              }}>
              Community
            </MenuTab>
            <MenuTab
              onClick={() => {
                navigate('contact');
              }}>
              Contact
            </MenuTab>
          </MenuTabContainer>
        </MenuContainer>
        <HeaderProfileContainer>
          {isLoggedIn ? (
            <>
              <HeaderProfilePic src={profileImg} onClick={navigateToMyInfo} />
              <UsernameButton onClick={navigateToMyInfo}>{username}</UsernameButton>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </>
          ) : (
            <>
              <LoginButton
                onClick={() => {
                  navigate('/login');
                }}>
                Login
              </LoginButton>
              <CreateAccountButton onClick={navigateToSignUp}>Create Account</CreateAccountButton>
            </>
          )}
        </HeaderProfileContainer>
      </HeaderContainer>
      {/* 키눌렀을 때 왜 작동안하는지 모르겠음. 글씨 가운데 정렬하는 법?*/}


      {
      // 헤더 백그라운드 추 
      // loginModalState는 모달의 활성화 상태를 나타내는 state로 가정합니다.
      // 실제 앱에서 해당 state나 로직에 따라 조건을 적절히 조절해야 합니다.
      loginModalState && (
        <AlertModalBackground onClick={modalcloseHandler}>
      <AlertModal modalType='loginModal' onClick={() => {modalcloseHandler()}}>로그인이 필요한 서비스입니다.</AlertModal>
        </AlertModalBackground>
      )
    }
      </Entire>
    </>
  );
};

export default Header;

const Entire = styled.div`
display: flex;
justify-content: center;
`

const HeaderContainer = styled.div`
  position: fixed;
  /* transform: scale(0.65); // 이 줄을 추가 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  min-width: 960px;
  height: 100px;
  background-color: #ffffff;
  border: none;
  padding-left: 80px;
  padding-right: 80px;
  /* position: sticky; */

  @media (max-width: 1152px) {
    // 화면 크기가 1056px 이하일 때
    /* transform: scale(0.6); // 이 줄을 추가 */
  }

  @media (max-width: 768px) {
    // 화면 크기가 768px 이하일 때
    /* transform: scale(0.4); // 이 줄을 추가 */
  }

  @media (max-width: 480px) {
    // 화면 크기가 480px 이하일 때
    transform: scale(0.25); // 이 줄을 추가
  }
`;

const MenuContainer = styled.div`
  width: 861px;
  height: 85.1px;
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled.img`
  width: 115px;
  height: 85.059px;
  margin-top: 15px;
  margin-bottom: 11.94px;
  cursor: pointer;
`;

const HeaderLogoText = styled.div`
  color: black;
  font-family: 'Inter';
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 24px;
  margin-right: 24px;
  cursor: pointer;
`;

const MenuTabContainer = styled.div`
  display: flex;
  width: 558px;
  height: 56px;
`;

const MenuTab = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  padding-right: 24px;
  padding-left: 24px;
  white-space: nowrap;
  color: #1a1a1a;

  font-family: 'Inter';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &:hover {
    color: #7092bf;
    cursor: pointer;
  }
`;

const HeaderProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 341px;
  height: 56px;
`;

const HeaderProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #d9d9d9;
  cursor: pointer;
`;

const ButtonStyle = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 24px 16px 24px;
  border-radius: 120px;
  background-color: #1a1a1a;
  color: #ffffff;
  font-family: 'Inter';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  height: 56px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: #7092bf;
  }
`;

const UsernameButton = styled(ButtonStyle)`
  font-size: 20px;
  background-color: #ffffff;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  margin-left: 10px;
  margin-right: 10px;
`;

const LogoutButton = styled(ButtonStyle)``;

const LoginButton = styled(ButtonStyle)``;

const CreateAccountButton = styled(ButtonStyle)`
  background-color: #ffffff;
  color: #1a1a1a;
  border: 1px solid #1a1a1a;
  margin-left: 10px;
`;

const AlertModal = styled(Modal)`
    width: 25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    padding-bottom: 4rem;
    

    div > .modal-cont-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        > .modal-title {
            font-family: 'Inter';
            font-size: 24px;
            font-weight: 400;
            line-height: normal;
            text-align: center;
            
        }

    }

    p {
        text-align: center;
        font-family: Inter;
        font-size: 14px;
        line-height: normal;
    }
`;

const AlertModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경 추가
`;