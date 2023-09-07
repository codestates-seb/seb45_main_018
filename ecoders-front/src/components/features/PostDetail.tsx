import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Button from '../atoms/Button';
import { AiOutlineHeart } from 'react-icons/ai';
import CommunityButtonGroup from './CommunityButtonGroup';
import Modal from '../atoms/Modal';

import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../redux/slice/modalSlice';

import { post, comment } from '../../pages/CommunityPostDetailPage';
import { useState } from 'react';

const HeaderButtons = ({ dummyData }: { dummyData: post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function postModifyHandler() {
    // 게시물 정보와 함께 postwrite로 이동
    navigate(`/community/postwrite`, { state: { dummyData } });
  }

  function postDeleteHandler() {
    // 게시글 삭제 요청 처리 후 게시판으로 이동
    navigate(`/community`);
  }

  function postDeleteModalHandler() {
    dispatch(openModal());
  }

  return (
    <div className="header-buttons">
      {/* 삭제 예 -> 서버에 delete 요청 */}
      <Modal className="post-delete">
        <div>해당 게시글을 삭제하시겠습니까?</div>
        <ModalButtons>
          <Button onClick={postDeleteHandler}>예</Button>
          <Button
            onClick={() => {
              dispatch(closeModal());
            }}>
            아니요
          </Button>
        </ModalButtons>
      </Modal>

      <Button width="50px" fontSize={0.5} hoverBgColor="#7092bf" hoverColor="white" onClick={postModifyHandler}>
        수정
      </Button>
      <Button width="50px" fontSize={0.5} hoverBgColor="#7092bf" hoverColor="white" onClick={postDeleteModalHandler}>
        삭제
      </Button>
    </div>
  );
};

function CommentDetail({ comment }: { comment: Array<comment> }) {
  return (
    <div className="post-comment-container">
      {comment.map((item, index) => {
        return (
          <div className="post-comment" key={index}>
            <div className="comment-detail">
              <p className="comment-user">{item.userName}</p>
              <p className="comment-content">{item.comment}</p>
            </div>

            <div className="comment-date">{item.commentDate}</div>
          </div>
        );
      })}
    </div>
  );
}

function CommentAdd() {
  const [comment, setComment] = useState('');

  function changeCommentHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment((event.target as HTMLTextAreaElement).value);
  }
  // 댓글 등록 버튼 클릭 함수
  function submitCommentHandler() {
    console.log(comment);
  }
  return (
    <div className="post-comment-add">
      <div className="post-comment-add-user">User</div>
      <textarea
        className="post-comment-add-content"
        placeholder="댓글을 남겨주세요"
        value={comment}
        onChange={changeCommentHandler}></textarea>
      <div className="post-comment-submit">
        <Button width="50px" fontSize={0.5} hoverBgColor="#7092bf" hoverColor="white" onClick={submitCommentHandler}>
          등록
        </Button>
      </div>
    </div>
  );
}

function PostDetail({ dummyData }: { dummyData: post }) {
  const navigate = useNavigate();
  function goToCommunityHandler() {
    navigate(`/community`);
  }
  //  {/* dangerouslySetInnerHTML <- 보안 정책 생각해보기 */}
  return (
    <PostDetailLayout>
      <PostDetailHeader>
        <h2>{dummyData.title}</h2>
        <div className="header-detail">
          <div className="post-date">{dummyData.date}</div>
          <HeaderButtons dummyData={dummyData} />
        </div>
      </PostDetailHeader>
      <PostDetailContent>
        <div>
          <div dangerouslySetInnerHTML={{ __html: dummyData.content }}></div>
        </div>
      </PostDetailContent>
      <PostDetailFooter>
        <div className="lick-count-container">
          <AiOutlineHeart />
          <div>{dummyData.likeCount}</div>
        </div>
        <Button
          width="65px"
          height="30px"
          borderRadius="15px"
          fontSize={0.5}
          hoverBgColor="#7092bf"
          hoverColor="white"
          onClick={goToCommunityHandler}>
          목록
        </Button>
      </PostDetailFooter>

      <PostFooter>
        {/* 댓글 리스트 map으로 */}
        <CommentDetail comment={dummyData.comment} />
        <CommentAdd />
      </PostFooter>

      <CommunityButtonGroup left="73%" />
    </PostDetailLayout>
  );
}

export default PostDetail;

const PostDetailLayout = styled.div`
  width: 748px;
  height: auto;
  border: 1px solid #9a9fa1;
  background-color: #eceff1;
  margin: 0 auto;
  padding: 20px;
  border-radius: 15px;
  justify-content: center;
  @media all and (max-width: 770px) {
    width: 80%;
  }
`;

const PostDetailHeader = styled.div`
  padding: 15px;
  background-color: #fcfcfc;
  border: 1px solid #a8adaf;
  border-radius: 15px;
  margin-bottom: 20px;
  div.header-detail {
    display: flex;
    justify-content: space-between;
  }
  div.header-detail div.post-date {
    margin-left: 5px;
    font-size: 13px;
  }
  div.header-buttons button {
    margin-left: 5px;
  }
`;

const PostDetailContent = styled.div`
  padding: 20px;
  background-color: #fcfcfc;
  border: 1px solid #a8adaf;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const PostDetailFooter = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  margin-bottom: 20px;
  div.lick-count-container {
    display: flex;
    margin: 0 10px;
    font-size: 20px;
  }
  div.lick-count-container svg {
    font-size: 30px;
    margin: 0 5px;
  }
  div.lick-count-container svg.isLiked {
    font-size: 30px;
    margin: 0 5px;
    color: #e7325f;
  }
  div.lick-count-container svg:hover {
    font-size: 32px;
    cursor: pointer;
  }
  button {
    margin: 0 15px;
  }
`;

const PostFooter = styled.div`
  div.post-comment-container div.post-comment {
    padding: 10px;
    margin-bottom: 10px;
    background-color: #fcfcfc;
    border: 1px solid #a8adaf;
    border-radius: 15px;
  }
  div.post-comment div.comment-detail {
    display: flex;
  }
  div.post-comment p.comment-user {
    width: 70px;
    font-size: 14px;
    font-weight: 600;
    padding: 0 10px;
  }
  div.post-comment p.comment-content {
    font-size: 15px;
    padding: 0 10px;
  }
  div.post-comment div.comment-date {
    display: flex;
    justify-content: right;
    font-size: 13px;
  }
  div.post-comment-add {
    padding: 10px;
    background-color: #fcfcfc;
    border: 1px solid #a8adaf;
    border-radius: 15px;
  }
  div.post-comment-add div.post-comment-add-user {
    font-size: 14px;
    font-weight: 600;
    padding: 5px;
  }
  div.post-comment-add textarea.post-comment-add-content {
    margin-top: 5px;
    width: 98%;
    height: 100px;
    border-radius: 10px;
    padding: 1%;
  }
  div.post-comment-add div.post-comment-submit {
    margin-top: 5px;
    display: flex;
    justify-content: right;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  button {
    width: 100px;
    margin: 0px 10px;
  }
`;
