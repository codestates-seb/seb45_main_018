import { GoMoveToTop } from 'react-icons/go';
import { styled } from 'styled-components';

import { Link } from 'react-router-dom';

function CommunityButtonGroup() {
  function moveToTopButtonClickHandler() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <ButtonGroup>
      <Link to="/community/write">
        <button>글쓰기</button>
      </Link>

      <button onClick={moveToTopButtonClickHandler}>
        <GoMoveToTop />
      </button>
    </ButtonGroup>
  );
}
export default CommunityButtonGroup;

const ButtonGroup = styled.div`
  position: fixed;
  left: 80%;
  top: 85%;
  z-index: 2;
  button {
    margin: 5px;
  }
`;
