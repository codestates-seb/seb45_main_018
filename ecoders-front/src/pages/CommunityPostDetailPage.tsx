// import PostDetail from '../components/features/PostDetail';

export interface comment {
  userName: string;
  comment: string;
  commentDate: string;
}
export interface post {
  postNumber: string | undefined;
  userName: string;
  title: string;
  content: string;
  likeCount: number;
  category: string;
  date: string;
  comment: Array<comment>;
}

function CommunityPostDetailPage() {
  return (<></>)
  };
  // return <PostDetail dummyData={dummyData} />;


export default CommunityPostDetailPage;
