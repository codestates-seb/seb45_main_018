import styled from 'styled-components';
import logo from '../../assets/Logo.png';
import profileImg from '../../assets/ProfileImage.svg';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const navigateToMain = () => {
    navigate('/');
  };

  const navigateToMyInfo = () => {
    navigate('/myinfo');
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
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
            <MenuTab
              onClick={() => {
                navigate('/eco-habit');
              }}>
              Eco-Habit
            </MenuTab>
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
              <UsernameButton onClick={navigateToMyInfo}>Username</UsernameButton>
              <LogoutButton onClick={() => { setIsLoggedIn(false); navigate("/");}}>Logout</LogoutButton>
            </>
          ) : (
            <>
              <LoginButton onClick={() => setIsLoggedIn(true)}>Login</LoginButton>
              <CreateAccountButton>Create Account</CreateAccountButton>
            </>
          )}
        </HeaderProfileContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.div`
  transform: scale(0.8); // 이 줄을 추가
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  min-width: 960px;
  height: 70px;
  background-color: #ffffff;
  border: none;
  padding-left: 80px;
  padding-right: 80px;

  @media (max-width: 1152px) {
    // 화면 크기가 1056px 이하일 때
    transform: scale(0.55); // 이 줄을 추가
  }

  @media (max-width: 768px) {
    // 화면 크기가 768px 이하일 때
    transform: scale(0.4); // 이 줄을 추가
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
  background-color: #ffffff;
  border: 1px solid #1A1A1A; 
  color: #1a1a1a;
  margin-left: 10px;
  margin-right: 10px;
`;

const LogoutButton = styled(ButtonStyle)``;

const LoginButton = styled(ButtonStyle)``;

const CreateAccountButton = styled(ButtonStyle)`
  background-color: #ffffff;
  color: #1a1a1a;
  border: 1px solid #1A1A1A;
  margin-left: 10px;
`;
