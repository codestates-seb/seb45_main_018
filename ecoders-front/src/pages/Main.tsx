import { useState } from 'react';
import styled from 'styled-components';
import LogoutMain from '../assets/Main.png';
import LoginMain from '../assets/Login_Main.png';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import EcoHabitButton from '../assets/EcoHabitDefaultButton.png';
import EcoHabitHoveringButton from '../assets/EcoHabitHoveringButton.png';
import { useNavigate } from 'react-router-dom';



const Main = () => {
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();


  return (
    <>
      {isLoggedIn ? (
        <>
        <Wrapper>
          <StyledImage src={LoginMain} />;
          <ButtonImage
            src={isHovered ? EcoHabitHoveringButton : EcoHabitButton}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            onClick={() => navigate('/eco-habit')}
          />
          </Wrapper>
        </>
      ) : (
        <>
          <StyledImage src={LogoutMain} />;
        </>
      )}
    </>
  );
};

export default Main;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`

const StyledImage = styled.img`
  max-width: 1280px;
  width: 100%;


  @media (max-width: 1152px) {
    // 화면 크기가 1152px 이하일 때
    max-width: 700px; // 이미지의 최대 가로 폭을 500px로 제한
  }

  @media (max-width: 768px) {
    // 화면 크기가 768px 이하일 때
    max-width: 500px; // 이미지의 최대 가로 폭을 500px로 제한
  }

  @media (max-width: 480px) {
    // 화면 크기가 480px 이하일 때
    max-width: 300px; // 이미지의 최대 가로 폭을 300px로 제한
  }
`;

const ButtonImage = styled.img`
  position: absolute;
  top: 80%;  // 버튼의 상단 위치를 조정하세요  
  left: 50%; // 버튼의 좌측 위치를 조정하세요
  transform: translate(-50%, -50%);  // 이 코드는 버튼의 중앙을 정확히 설정하기 위함입니다
  max-width: 284px;

  @media (max-width: 1152px) {
    // 화면 크기가 1152px 이하일 때
    max-width: 170.4px; // 이미지의 최대 가로 폭을 500px로 제한
  }

  @media (max-width: 768px) {
    // 화면 크기가 768px 이하일 때
    max-width: 113.6px; // 이미지의 최대 가로 폭을 500px로 제한
  }

  @media (max-width: 480px) {
    // 화면 크기가 480px 이하일 때
    max-width: 71px; // 이미지의 최대 가로 폭을 300px로 제한
  }
`;
