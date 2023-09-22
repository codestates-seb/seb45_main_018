import Board from '../components/features/Board';
import styled from 'styled-components';

export interface card {
  postId: number;
  title: string;
  category: string;
  thumbnailUrl: string;
  username: string;
  createdAt: string;
  likes: number;
  likedByUserIds: Array<string>;
}

function CommunityPage() {
  return (
    <>
    <DivContainer>
      <Board />
    </DivContainer>
    </>
  );
}
export default CommunityPage;

const DivContainer = styled.div`
  height:100vh;
`;
