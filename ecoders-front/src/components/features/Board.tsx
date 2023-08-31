import styled from 'styled-components';
import BoardCard from './BoardCard';
import CommunityButtonGroup from './CommunityButtonGroup';

export interface card {
  userName: string;
  title: string;
  likeCount: number;
  category: string;
  date: string;
  imgUrl: string;
}

function Board() {
  const dummyData: Array<card> = [
    {
      userName: '남극러버',
      title: '소중한 극지방, 남극 봉사단 구합니다!',
      likeCount: 12,
      category: '모집글',
      date: '2023/07/20 16:21',
      imgUrl: 'https://source.unsplash.com/random/230x140/?antarctica',
    },
    {
      userName: '지구보호',
      title: '[지금, 지구] 지구를 위한 캠페인 운동 "지금, 지구"',
      likeCount: 10,
      category: '모집글',
      date: '2023/08/01 10:10',
      imgUrl: 'https://source.unsplash.com/random/230x140/?earth',
    },
    {
      userName: '예예',
      title: '일주일 텀블러 사용 완료, 인증글 올립니다~',
      likeCount: 5,
      category: '인증글',
      date: '2023/08/03 14:41',
      imgUrl: 'https://source.unsplash.com/random/230x140/?tumbler',
    },
    {
      userName: '요즘건강',
      title: '걷는 습관, 지구와 나 모두 건강하게!',
      likeCount: 90,
      category: '',
      date: '2023/08/11 19:07',
      imgUrl: 'https://source.unsplash.com/random/230x140/?walk',
    },
    {
      userName: '지구야 아프지말자',
      title: '절절하게 절약절약, 탄소발자국 줄여가는 챌린지! 참가자 모집합니다.',
      likeCount: 3,
      category: '모집글',
      date: '2023/08/12 22:34',
      imgUrl: 'https://source.unsplash.com/random/230x140/?forest',
    },
    {
      userName: '유리',
      title: '일회용품 사용 최대한 참았어요!',
      likeCount: 3,
      category: '인증글',
      date: '2023/08/12 16:40',
      imgUrl: 'https://source.unsplash.com/random/230x140/?plastic',
    },
    {
      userName: '최고짱',
      title: '탄소발자국이 뭔가요?',
      likeCount: 40,
      category: '',
      date: '2023/08/18 17:01',
      imgUrl: 'https://source.unsplash.com/random/230x140/?tree',
    },
    {
      userName: '모두힘내',
      title: '장바구니 사용, 어느정도 실천하고 계신가요? 함께 챌린지 해봐용~',
      likeCount: 30,
      category: '모집글',
      date: '2023/08/22 09:30',
      imgUrl: 'https://source.unsplash.com/random/230x140/?basket',
    },
  ];

  return (
    <BoardLayout>
      <BoardHead>
        <div className="board-header-container">
          <div className="board-header-btn-container">
            {/* atoms에서 버튼 가져와 사용 */}
            <button>전체</button>
            <button>모집글</button>
            <button>인증글</button>
          </div>
          <div className="board-header-serch-input-container">
            {/* atoms에서 인풋 가져와 사용 */}
            <input></input>
          </div>
        </div>
      </BoardHead>
      <br></br>
      <BoardBody>
        <div className="board-body-container">
          {/* dummyData -> 서버에서 받아오는 글 데이터로 해야함 */}
          <BoardCard dummyData={dummyData}></BoardCard>
        </div>
      </BoardBody>
      <CommunityButtonGroup />
    </BoardLayout>
  );
}

export default Board;

const BoardLayout = styled.div`
  width: 100%;
`;

const BoardHead = styled.div`
  width: 64%;
  background-color: #eceff1;
  display: flex;
  margin: 0 auto;
  border-radius: 15px;
  div.board-header-container {
    width: 100%;
    margin: 20px 25px 20px 25px;
    display: flex;
    justify-content: space-between;
  }
  div.board-header-btn-container {
    display: flex;
  }
  div.board-header-btn-container button {
    margin: 0 2px;
  }
  @media all and (max-width: 650px) {
    width: 64%;
    background-color: #eceff1;
    display: flex;
    border-radius: 15px;
    div.board-header-container {
      display: block;
      align-items: center;
    }
    div.board-header-btn-container {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
    div.board-header-btn-container button {
      margin: 5px;
      font-size: 10px;
    }
    div.board-header-serch-input-container {
      display: flex;
      justify-content: center;
    }
  }
`;

const BoardBody = styled.div`
  width: 64%;
  background-color: #eceff1;
  display: flex;
  margin: 0 auto;
  border-radius: 15px;
  div.board-body-container {
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
  }
  div.board-body-container div.board-card-container {
    margin: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  @media all and (max-width: 480px) {
    width: 64%;
    background-color: #eceff1;
    display: flex;
    margin: 0 auto;
    border-radius: 15px;
    div.board-body-container {
      display: flex;
      flex-wrap: wrap;
    }
    div.board-body-container div.board-card-container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin: 0 auto;
    }
  }
`;
