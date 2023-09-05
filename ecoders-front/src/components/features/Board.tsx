import styled from 'styled-components';

import { useState, useEffect } from 'react';

import BoardCard from './BoardCard';
import CommunityButtonGroup from './CommunityButtonGroup';
import CommonButton from '../atoms/CommonButton';

export interface card {
  userName: string;
  title: string;
  likeCount: number;
  category: string;
  date: string;
  imgUrl: string;
}

function Board() {
  const categoryOption: Array<string> = ['전체', '모집글', '인증글'];
  //카테고리 상태 (카드 컴포넌트에 넘겨주기 -> 조건부 렌더링 진행)
  const [category, setCategory] = useState('전체');
  //검색창 입력 데이터
  const [searchText, setSearchText] = useState('');

  //더미 데이터
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

  //필터된 데이터 state
  const [filteredData, setFilteredData] = useState(Array<card>);

  function changeCategoryHandler(event: React.MouseEvent<HTMLButtonElement>) {
    setCategory((event.target as HTMLButtonElement).value);
  }
  function changeSearchTextHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText((event.target as HTMLInputElement).value);
  }

  //필터 기능(특정 state(여기선 filteredData)가 바뀔 때마다.)
  useEffect(() => {
    if (category === '모집글') {
      setFilteredData(
        dummyData.filter(item => {
          console.log(item.category);
          return item.category === category;
        }),
      );
    } else if (category === '인증글') {
      setFilteredData(
        dummyData.filter(item => {
          return item.category === category;
        }),
      );
    } else {
      setFilteredData(dummyData);
    }
  }, [category]);

  return (
    <BoardLayout>
      <BoardHead>
        <div className="board-header-container">
          <div className="board-header-btn-container">
            {categoryOption.map((item, index) => {
              return (
                <>
                  <CommonButton
                    key={index}
                    className={category === item ? 'clicked-category' : ''}
                    width="60px"
                    fontSize={0.5}
                    hoverBgColor="#7092bf"
                    hoverColor="white"
                    value={item}
                    onClick={changeCategoryHandler}>
                    {item}
                  </CommonButton>
                </>
              );
            })}
          </div>
          <div className="board-header-serch-input-container">
            <SearchInput type="search" value={searchText} onChange={changeSearchTextHandler} />
          </div>
        </div>
      </BoardHead>
      <br></br>
      <BoardBody>
        <div className="board-body-container">
          {/* 필터된 데이터 전달 */}
          <BoardCard dummyData={filteredData}></BoardCard>
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
  border: 1px solid #a8adaf;
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
    flex-wrap: wrap;
  }
  div.board-header-btn-container {
    display: flex;
  }
  div.board-header-btn-container button {
    margin: 0 4px;
  }
  div.board-header-btn-container button.clicked-category {
    background-color: #7092bf;
    color: #ffffff;
    border: 1px solid #ffffff;
  }
  @media all and (max-width: 740px) {
    width: 70%;
    background-color: #eceff1;
    display: flex;
    border-radius: 15px;
    div.board-header-container {
      display: block;
      align-items: center;
    }
    div.board-header-btn-container {
      margin: 0 auto;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
    div.board-header-btn-container button {
      margin: 3px;
    }
    div.board-header-serch-input-container {
      margin: 0 auto;
      display: flex;
      justify-content: center;
    }
  }
`;

const BoardBody = styled.div`
  border: 1px solid #a8adaf;
  width: 64%;
  background-color: #eceff1;
  display: flex;
  margin: 0 auto;
  border-radius: 15px;
  div.board-body-container {
    width: 100%;
  }
  div.board-body-container div.board-card-container {
    margin: 20px;
    /* display: flex;
    flex-wrap: wrap;
    justify-content: center; */
    display: grid;
    grid-template-columns: repeat(4, minmax(20%, auto));
    grid-gap: 15px;
    justify-content: center;
    align-items: center;
  }
  div.board-card {
    border: 1px solid #566e915a;
  }
  /* 카드 hover시 효과 */
  div.board-card:hover {
    box-shadow: 1.5px 1.5px 3px 0px #7092bf;
    cursor: pointer;
  }
  /* 그리드 속성이.. 너무 엉망인것같아요.. ㅠㅁㅠ~ 여쭤봐야징 */
  @media all and (max-width: 1355px) {
    div.board-body-container div.board-card-container {
      margin: 20px;
      /* display: flex;
    flex-wrap: wrap;
    justify-content: center; */
      display: grid;
      grid-template-columns: repeat(3, minmax(30%, auto));
      grid-gap: 5px;
      justify-content: center;
      align-items: center;
    }
  }
  @media all and (max-width: 1045px) {
    div.board-body-container div.board-card-container {
      margin: 20px;
      /* display: flex;
    flex-wrap: wrap;
    justify-content: center; */
      display: grid;
      grid-template-columns: repeat(2, minmax(40%, auto));
      grid-gap: 5px;
      justify-content: center;
      align-items: center;
    }
  }
  @media all and (max-width: 770px) {
    div.board-body-container div.board-card-container {
      margin: 20px;
      /* display: flex;
    flex-wrap: wrap;
    justify-content: center; */
      display: grid;
      grid-template-columns: repeat(1, minmax(50%, auto));
      grid-gap: 5px;
      justify-content: center;
      align-items: center;
    }
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

const SearchInput = styled.input`
  width: 200px;
  border: 1.5px solid #afafaf;
  padding: 0 10px;
  height: 30px;
  border-radius: 50px;
  @media all and (min-width: 900px) {
    width: 300px;
    margin: 0;
  }
`;
