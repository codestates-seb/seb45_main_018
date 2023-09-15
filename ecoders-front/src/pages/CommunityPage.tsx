import Board from '../components/features/Board';

export interface card {
  postId: number;
  title: string;
  category: string;
  thumbnailUrl: string;
  username: string;
  createdAt: string;
  likes: number;
  likedByUserIds: Array<number>;
}

//더미 데이터
// const dummyData: Array<card> = [
//   {
//     id: 1,
//     userName: '남극러버',
//     title: '소중한 극지방, 남극 봉사단 구합니다!',
//     likeCount: 12,
//     category: '모집글',
//     date: '2023/07/20 16:21',
//     imgUrl: 'https://source.unsplash.com/random/230x140/?antarctica',
//   },
//   {
//     id: 2,
//     userName: '지구보호',
//     title: '[지금, 지구] 지구를 위한 캠페인 운동 "지금, 지구"',
//     likeCount: 10,
//     category: '모집글',
//     date: '2023/08/01 10:10',
//     imgUrl: 'https://source.unsplash.com/random/230x140/?earth',
//   },
//   {
//     id: 3,
//     userName: '예예',
//     title: '일주일 텀블러 사용 완료, 인증글 올립니다~',
//     likeCount: 5,
//     category: '인증글',
//     date: '2023/08/03 14:41',
//     imgUrl: 'https://source.unsplash.com/random/230x140/?tumbler',
//   },
//   {
//     id: 4,
//     userName: '요즘건강',
//     title: '걷는 습관, 지구와 나 모두 건강하게!',
//     likeCount: 90,
//     category: '',
//     date: '2023/08/11 19:07',
//     imgUrl: 'https://source.unsplash.com/random/230x140/?walk',
//   },
//   {
//     id: 5,
//     userName: '지구야 아프지말자',
//     title: '절절하게 절약절약, 탄소발자국 줄여가는 챌린지! 참가자 모집합니다.',
//     likeCount: 3,
//     category: '모집글',
//     date: '2023/08/12 22:34',
//     imgUrl: 'https://source.unsplash.com/random/230x140/?forest',
//   },
//   {
//     id: 6,
//     userName: '유리',
//     title: '일회용품 사용 최대한 참았어요!',
//     likeCount: 3,
//     category: '인증글',
//     date: '2023/08/12 16:40',
//     imgUrl: 'https://source.unsplash.com/random/230x140/?plastic',
//   },
//   {
//     id: 7,
//     userName: '최고짱',
//     title: '탄소발자국이 뭔가요?',
//     likeCount: 40,
//     category: '',
//     date: '2023/08/18 17:01',
//     imgUrl: 'https://source.unsplash.com/random/230x140/?tree',
//   },
//   {
//     id: 8,
//     userName: '모두힘내',
//     title: '장바구니 사용, 어느정도 실천하고 계신가요? 함께 챌린지 해봐용~',
//     likeCount: 30,
//     category: '모집글',
//     date: '2023/08/22 09:30',
//     imgUrl: 'https://source.unsplash.com/random/230x140/?basket',
//   },
// ];

function CommunityPage() {
  return <Board />;
}
export default CommunityPage;
