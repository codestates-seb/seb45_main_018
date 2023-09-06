import { GoMoveToTop } from 'react-icons/go';
import { styled } from 'styled-components';

import { Link } from 'react-router-dom';

interface leftSetting {
  left?: string;
}
function CommunityButtonGroup(props: leftSetting) {
  function moveToTopButtonClickHandler() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <ButtonGroup {...props}>
      <Link to="/community/postwrite">
        <HasWriteButton> + 글쓰기</HasWriteButton>
      </Link>
      <HasIconButton onClick={moveToTopButtonClickHandler}>
        <GoMoveToTop />
      </HasIconButton>
    </ButtonGroup>
  );
}
export default CommunityButtonGroup;

const ButtonGroup = styled.div<leftSetting>`
  position: fixed;
  left: ${props => (props.left ? props.left : '75%')};
  top: 85%;
  z-index: 0.5;
  button {
    margin: 5px;
  }
  @media all and (max-width: 680px) {
    left: 75%;
    top: 80%;
  }
`;

const HasWriteButton = styled.button`
  width: 100px;
  height: 50px;
  border: 1.5px solid black;
  border-radius: 10rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: white;
  color: black;

  &:hover {
    border: none;
    background-color: #7092bf;
    color: white;
  }
  @media all and (max-width: 480px) {
    width: 55px;
    height: 35px;
    font-size: 0.6rem;
  }
`;

const HasIconButton = styled.button`
  width: 45px;
  height: 45px;
  border: 1.5px solid black;
  border-radius: 10rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: white;
  color: black;

  svg {
    stroke-width: 4%;
  }
  &:hover {
    border: none;
    background-color: #7092bf;
    color: white;
  }

  @media all and (max-width: 480px) {
    width: 55px;
    height: 35px;
    font-size: 0.6rem;
  }
`;
