import styled from 'styled-components';

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

import BoardCard from './BoardCard';
import CommunityButtonGroup from './CommunityButtonGroup';
import Button from '../atoms/Button';

import { useSelector } from 'react-redux';

import { card } from '../../pages/CommunityPage';
import Loading from '../sharedlayout/Loading';

type ApiState = {
  api: {
    APIURL: string;
  };
};

function Board() {
  const APIURL = useSelector((state: ApiState) => state.api.APIURL);

  const categoryOption: Array<string> = ['전체', '모집글', '인증글'];
  //카테고리 상태 (카드 컴포넌트에 넘겨주기 -> 조건부 렌더링 진행)
  const [category, setCategory] = useState('전체');
  //검색창 입력 데이터
  const [searchText, setSearchText] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [post, setPosts] = useState<Array<card>>([]);
  // 우선 페이지를 마지막 포스트 아이디로 사용
  const [page, setPage] = useState(99999);

  // 검색어
  const [keyWord, setKeyWord] = useState('');

  const containerRef = useRef<HTMLDivElement | null>(null);

  //필터된 데이터 state
  const [filteredData, setFilteredData] = useState<Array<card>>([]);

  //렌더링 첫 번째에 받아오기 1page -> 20개
  useEffect(() => {
    if (keyWord === '') {
      if (page === 99999) {
        axios
          .get(`${APIURL}/posts/all?lastPostId=99999&size=10`, {})
          .then(function (response) {
            // response
            console.log(response.data);
            setPosts(response.data);
            console.log(response.data[response.data.length - 1].postId);
            setPage(response.data[response.data.length - 1].postId);
            if (response.data.length < 10) {
              setPage(0);
              console.log(response.data.length);
            } else {
              setPage(response.data[response.data.length - 1].postId);
            }
          })
          .catch(function (error) {
            console.log('게시물 데이터 받아오기 실패');
            console.log(error);
          });
      }
    } else {
      if (page === 99999) {
        console.log('검색어 입력 후 다시렌더');
        axios
          .get(`${APIURL}/posts/all?lastPostId=99999&size=20&keyword=${keyWord}`)
          .then(function (response) {
            // response
            console.log(response.data);
            setPosts(response.data);
            console.log(response.data[response.data.length - 1].postId);
            setPage(response.data[response.data.length - 1].postId);
            if (response.data.length < 20) {
              setPage(0);
              console.log(response.data.length);
            } else {
              setPage(response.data[response.data.length - 1].postId);
            }
          })
          .catch(function (error) {
            console.log('게시물 데이터 받아오기 실패');
            console.log(error);
          });
      }
    }
  }, [keyWord]);

  // 스크롤 이벤트 핸들러를 창에 추가
  useEffect(() => {
    //무한스크롤 이벤트 발생시
    console.log(post.length);
    const handleScroll = () => {
      // 스크롤이 아래로 내려가면서 로딩중이 아니라면 새로운 데이터 로드
      if (
        containerRef.current &&
        containerRef.current.getBoundingClientRect().bottom <= window.innerHeight + 100 &&
        !isLoading &&
        post.length >= 10
      ) {
        setIsLoading(true);

        // console.log('page', page); //99999

        if (keyWord === '') {
          console.log(page);
          if (page !== 0) {
            // 여기서 수정
            axios
              .get(`${APIURL}/posts/all?lastPostId=${page}&size=10`)
              .then(function (response) {
                // response
                console.log(response.data);
                console.log('혹시..? 여기로 들어오나..?');
                console.log(response.data.length);
                console.log(response.data[response.data.length - 1]);
                setPosts(prevData => [...prevData, ...response.data]);

                if (response.data.length < 10) {
                  setPage(0);
                  console.log(response.data.length);
                } else {
                  setPage(response.data[response.data.length - 1].postId);
                }
                setIsLoading(false);
              })
              .catch(function (error) {
                console.log('게시물 데이터 받아오기 실패');
                console.log(error);
              });
          } else {
            setIsLoading(false);
            // console.log('더이상 받아올 데이터가 없음');
          }
        } else {
          if (page !== 0) {
            // 여기서 수정
            console.log(page);
            axios
              .get(`${APIURL}/posts/all?lastPostId=${page}&size=10&keyword=${keyWord}`)
              .then(function (response) {
                // response
                console.log(response.data);
                console.log(response.data.length);
                console.log(response.data[response.data.length - 1]);
                setPosts(prevData => [...prevData, ...response.data]);
                if (response.data.length < 10) {
                  setPage(0);
                  console.log(response.data.length);
                } else {
                  setPage(response.data[response.data.length - 1].postId);
                }
                setIsLoading(false);
              })
              .catch(function (error) {
                console.log('게시물 데이터 받아오기 실패');
                console.log(error);
              });
          } else {
            setIsLoading(false);
            // console.log('더이상 받아올 데이터가 없음');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, keyWord, page]);

  // 카테고리 변경시
  function changeCategoryHandler(event: React.MouseEvent<HTMLButtonElement>) {
    console.log('카테고리 변경됨');
    console.log((event.target as HTMLButtonElement).innerText);
    setCategory((event.target as HTMLButtonElement).innerText);
  }

  // 검색어 변경시
  function submitSearchWordHandle(event: React.KeyboardEvent<HTMLInputElement>) {
    // 엔터 키를 눌렀을 때 이벤트를 처리
    if (event.key === 'Enter') {
      // 입력한 내용을 처리하거나 원하는 동작 수행
      setKeyWord((event.target as HTMLInputElement).value);
      setPage(99999);
      // alert('Enter key pressed with input value: ' + keyWord);
    }
  }
  function changeSearchTextHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText((event.target as HTMLInputElement).value);
  }

  //필터 기능(특정 state(여기선 filteredData)가 바뀔 때마다 실행)
  useEffect(() => {
    console.log('카테고리 변경?');
    console.log(category);
    console.log(post);
    if (category === '모집글') {
      setFilteredData(
        post.filter(item => {
          console.log(item.category);
          return item.category === category;
        }),
      );
    } else if (category === '인증글') {
      setFilteredData(
        post.filter(item => {
          return item.category === category;
        }),
      );
    } else {
      setFilteredData(post);
    }
  }, [category, post]);

  return (
    <BoardLayout>
      <BoardHead>
        <div className="board-header-container">
          <div className="board-header-btn-container">
            {categoryOption.map((item, index) => {
              return (
                <>
                  <Button
                    key={index}
                    className={category === item ? 'clicked-category' : ''}
                    width="70px"
                    fontSize={1}
                    hoverBgColor="#7092bf"
                    hoverColor="white"
                    onClick={changeCategoryHandler}>
                    {item}
                  </Button>
                </>
              );
            })}
          </div>
          <div className="board-header-serch-input-container">
            <SearchInput
              type="search"
              value={searchText}
              onChange={changeSearchTextHandler}
              onKeyUp={submitSearchWordHandle}
            />
          </div>
        </div>
      </BoardHead>
      <br />
      <BoardBody>
        <div className="board-body-container" ref={containerRef}>
          {/* 필터된 데이터 전달 */}
          {/*  likedPosts={likedPosts}  전달...*/}
          <BoardCard data={filteredData}></BoardCard>
          {isLoading && <Loading />}
        </div>
      </BoardBody>
      <CommunityButtonGroup top="15%" />
    </BoardLayout>
  );
}

export default Board;

const BoardLayout = styled.div`
  width: 100%;
`;

const BoardHead = styled.div`
  border: 1px solid #a8adaf;
  width: 66%;
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
  width: 66%;
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
