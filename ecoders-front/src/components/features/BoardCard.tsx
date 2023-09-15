import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { card } from '../../pages/CommunityPage';

type UserState = {
  user: {
    accessToken: string | null;
    username: string;
    // id: string;
    id: number;
    stamp: number;
  };
};

function BoardCard({ data }: { data: Array<card> }) {
  const USERID = useSelector((state: UserState) => state.user.id);
  // console.log(dummyData);
  const navigate = useNavigate();

  function goToDetailHandeler(index: number) {
    //detaial페이지로 이동
    navigate(`/community/postdetail/${index}`);
  }
  return (
    <div className="board-card-container">
      {data.map((item, index) => {
        return (
          <CardBody
            key={index}
            className="board-card"
            onClick={() => {
              goToDetailHandeler(item.postId);
            }}>
            <div className="board-card-body">
              <div className="board-card-img-container">
                <img src={item.thumbnailUrl} />
              </div>
              <CardCategory>{item.category}</CardCategory>
              <CardTitle>{item.title}</CardTitle>
              <CardUserLike>
                <div className="user-name">{item.username}</div>
                <div className="like-count">
                  {/* 좋아요 한 리스트에 포함되어있나..? */}
                  {item.likedByUserIds.includes(USERID) ? (
                    <AiFillHeart className="aifillheart" />
                  ) : (
                    <AiOutlineHeart className="aioutheart" />
                  )}
                  <div>{item.likes}</div>
                </div>
              </CardUserLike>
              <CardDate>{item.createdAt}</CardDate>
            </div>
          </CardBody>
        );
      })}
    </div>
  );
}

export default BoardCard;

const CardBody = styled.div`
  width: 200px;
  height: 252px;
  overflow: hidden;
  margin: 10px;
  border-radius: 10px;
  background: #fcfcfc;
  div.board-card-body {
    margin: 8px 0;
  }
  div.board-card-img-container {
    width: 180px;
    height: 113px;
    overflow: hidden;
    margin: 3px;
    border-radius: 10px;
    background: #fcfcfc;
    margin: 0 auto;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media all and (max-width: 480px) {
    width: 200px;
    height: 252px;
    overflow: hidden;
    margin: 3px;
    border-radius: 10px;
    background: #fcfcfc;
    div.board-card-body {
      margin: 8px 0;
    }

    div.board-card-img-container {
      width: 180px;
      height: 110px;
      overflow: hidden;
      margin: 3px;
      border-radius: 10px;
      background: #fcfcfc;
      margin: 0 auto;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const CardCategory = styled.div`
  margin: 8px 0 0 8px;
  font-size: 12px;
  height: 13px;
`;
const CardTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  height: 40px;
  margin: 8px 8px 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const CardUserLike = styled.div`
  margin: 5px 8px 8px 8px;
  height: 13px;
  display: flex;
  justify-content: space-between;
  div.user-name {
    font-size: 13px;
    color: grey;
  }
  div.like-count {
    display: flex;
    font-size: 12px;
  }
  div.like-count svg {
    margin: 0 5px;
    width: 16px;
    height: 16px;
  }
  div.like-count svg.aifillheart {
    margin: 0 5px;
    width: 16px;
    height: 16px;
    color: #e7325f;
  }
`;
const CardDate = styled.div`
  margin: 15px 0 0 8px;
  font-size: 13px;
`;
