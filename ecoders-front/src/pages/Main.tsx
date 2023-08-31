import styled from 'styled-components';
import imagePath from '../assets/Main.png';

const Main = () => {
  return <StyledImage src={imagePath} />;
};

export default Main;

const StyledImage = styled.img`
  max-width: 1280px;
  width: 100%;

  @media (max-width: 1152px) {
    // 화면 크기가 768px 이하일 때
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
