import styled from 'styled-components';
import logo from '../../assets/Logo.png';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/loginSlice';
import { useSelector } from 'react-redux';
import { gapi } from 'gapi-script';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { setUsername } from '../../redux/slice/userSlice';
import { RootState } from '../../redux/store/store';
import Modal from './Modal';
import { openModal, closeModal } from '../../redux/slice/modalSlice';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const username = useSelector((state: RootState) => state.user.username); // username 상태 가져오기
  const APIURL = useSelector((state: RootState) => state.api.APIURL);
  const profileImg = useSelector((state: RootState) => state.user.profileImg);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const refreshToken = useSelector((state: RootState) => state.user.refreshToken);
  const authType = useSelector((state: RootState) => state.user.authType);
  const id = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    if (isLoggedIn === true) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${APIURL}/members/my-info`, {
            headers: {
              Authorization: accessToken,
              'Refresh-Token': refreshToken,
            },
          });
          if( response.status === 200) {
            dispatch(setUsername(response.data.username));
            }
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
    }
  }, [isLoggedIn, username]);

  function deleteCookie(name: string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  const handleLogout = async () => {
    deleteCookie('G_ENABLED_IDPS');
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });

    axios.delete(`${APIURL}/auth/logout`, {
      headers: {
        Authorization: accessToken,
        'refresh-token': refreshToken,
        id: id,
      },
    });

    if (authType === 'GOOGLE') {
      if (gapi.auth2 != undefined) {
        var auth2 = gapi.auth2.getAuthInstance();

        auth2.signOut().then(function () {
          console.log('User signed out.');
          dispatch(logout());
        });
      }
      location.href = '/';
    } else {
      dispatch(logout());
      navigate('/');
    }
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
    navigate('/login');
  };

  const modalOpenHandler = () => {
    dispatch(openModal('loginModal'));
  };
  const loginModalState = useSelector((state: RootState) => state.modal.modals.loginModal);

  //chatting 구현 이후 살리기
  // useEffect(()=> {
  //   if(!loginModalState) {
  //     navigate('/login')
  //   }
  // }, [loginModalState]);

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
                    onClick={() => {
                      modalOpenHandler();
                    }}>
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
          // 헤더모달백그라운드 추가 및 클릭 시 closeHandler 연결
          // loginModalState는 모달의 활성화 상태를 나타내는 state로 가정합니다.
          // 실제 앱에서 해당 state나 로직에 따라 조건을 적절히 조절해야 합니다.
          loginModalState && (
            <AlertModalBackground onClick={modalcloseHandler}>
              <AlertModal
                modaltype="loginModal"
                onClick={() => {
                  modalcloseHandler();
                }}>
                로그인이 필요한 서비스입니다.
              </AlertModal>
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
  height: 100px;
  margin-bottom: 20px;
`;

const HeaderContainer = styled.div`
  position: fixed;
  z-index: 40;
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
  width: auto;
  height: 50px;
  margin-top: 15px;
  margin-bottom: 11.94px;
  cursor: pointer;
`;

const HeaderLogoText = styled.div`
  color: black;
  font-family: 'Inter';
  font-size: 20px;
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
  font-size: 16px;
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
  font-size: 16px;
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

const LogoutButton = styled(ButtonStyle)`
  display: flex;
  justify-content: center;
  border: none;
  height: 80%;
`;

const LoginButton = styled(ButtonStyle)`
  display: flex;
  justify-content: center;
  border: none;
  height: 80%;
`;

const CreateAccountButton = styled(ButtonStyle)`
  display: flex;
  justify-content: center;
  height: 80%;
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
  z-index: 1000;

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
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경 추가
`;
