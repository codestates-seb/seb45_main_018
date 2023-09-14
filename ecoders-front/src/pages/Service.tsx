import styled from 'styled-components';
import Services from "../assets/Service.png"
import JoinButton from '../assets/JoinusButton.png'
import JoinHoverButton from '../assets/JoinusHoverButton.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Service = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();


  return (
        <>
        <Container>
          <StyledImage src={Services} />
          <ButtonImage
            src={isHovered ? JoinHoverButton : JoinButton}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            onClick={() => navigate('/signup')}
          />
          </Container>
        </>
  );
};

export default Service;

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 120px;
`


const StyledImage = styled.img`
  max-width: 1280px;
  width: 100%;
  margin-top: 184px;


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
  max-width: 802px;
  margin-top: 130px;

  @media (max-width: 1152px) {
    // 화면 크기가 1152px 이하일 때
    max-width: 400px; // 이미지의 최대 가로 폭을 500px로 제한
  }

  @media (max-width: 768px) {
    // 화면 크기가 768px 이하일 때
    max-width: 200px; // 이미지의 최대 가로 폭을 500px로 제한
  }

  @media (max-width: 480px) {
    // 화면 크기가 480px 이하일 때
    max-width: 100px; // 이미지의 최대 가로 폭을 300px로 제한
  }
`;