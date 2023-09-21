import Board from '../components/features/Board';

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
  return <Board />;
}
export default CommunityPage;
