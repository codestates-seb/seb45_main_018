import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Button from '../atoms/Button';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import CommunityButtonGroup from './CommunityButtonGroup';
import Modal from '../atoms/Modal';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../redux/slice/modalSlice';

import { postData, comment } from '../../pages/CommunityPostDetailPage';
import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

type ApiState = {
  api: {
    APIURL: string;
  };
};

type UserState = {
  user: {
    accessToken: string | null;
    username: string;
    id: string;
    // id: number;
    stamp: number;
  };
};

const HeaderButtons = ({ post }: { post: postData }) => {
  const USERACCESSTOKEN = useSelector((state: UserState) => state.user.accessToken);

  const APIURL = useSelector((state: ApiState) => state.api.APIURL);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function postModifyHandler() {
    // 게시물 정보와 함께 postwrite로 이동
    navigate(`/community/postwrite`, { state: { post } });
  }

  function postDeleteHandler() {
    // 게시글 삭제 요청 처리 후 게시판으로 이동
    axios
      .delete(`${APIURL}/posts/${post.postId}`, {
        headers: {
          Authorization: `${USERACCESSTOKEN}`,
        },
      })
      .then(function () {
        dispatch(closeModal('deletePostModal'));
        navigate(`/community`);
      })
      .catch(function (error) {
        console.log('게시물 삭제 실패');
        console.log(error);
      });
  }

  function postDeleteModalHandler() {
    dispatch(openModal('deletePostModal'));
  }

  return (
    <div className="header-buttons">
      {/* 삭제 예 -> 서버에 delete 요청 */}
      <Modal className="post-delete" modaltype="deletePostModal">
        <div>해당 게시글을 삭제하시겠습니까?</div>
        <ModalButtons>
          <Button onClick={postDeleteHandler}>예</Button>
          <Button
            onClick={() => {
              dispatch(closeModal('deletePostModal'));
            }}>
            아니요
          </Button>
        </ModalButtons>
      </Modal>

      <Button width="60px" fontSize={1} hoverBgColor="#7092bf" hoverColor="white" onClick={postModifyHandler}>
        수정
      </Button>
      <Button width="60px" fontSize={1} hoverBgColor="#7092bf" hoverColor="white" onClick={postDeleteModalHandler}>
        삭제
      </Button>
    </div>
  );
};

const CommentButtons = ({
  comment,

  commentList,
  setCommentList,
  setIsCommentModify,
}: {
  comment: comment;

  commentList: Array<comment>;
  setCommentList: React.Dispatch<React.SetStateAction<Array<comment> | undefined>>;
  setIsCommentModify: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const USERACCESSTOKEN = useSelector((state: UserState) => state.user.accessToken);
  const APIURL = useSelector((state: ApiState) => state.api.APIURL);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function commentModifyHandler() {
    // 댓글 정보를 가지고 수정..
    setIsCommentModify(comment.commentId);
  }

  function commentDeleteHandler() {
    // // 댓글 삭제 낙관적 업데이트
    setIsDeleteModalOpen(false);
    console.log(comment);
    if (commentList !== undefined) {
      console.log(commentList);
      const deletedCommentList = commentList.filter(item => {
        return item.commentId !== comment.commentId;
      });
      setCommentList(deletedCommentList);
    }

    axios
      .delete(`${APIURL}/posts/comment/${comment.commentId}`, {
        headers: {
          Authorization: `${USERACCESSTOKEN}`,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log('댓글 삭제 실패');
        console.log(error);
      });
  }

  function deleteModalOpenHandler() {
    setIsDeleteModalOpen(true);
  }
  function deleteModalCloseHandler() {
    setIsDeleteModalOpen(false);
  }
  return (
    <div className="comment-buttons">
      {isDeleteModalOpen ? (
        <Container className="post-delete">
          <Overlay onClick={deleteModalCloseHandler} />
          <Content>
            <IconBox>
              <FiX className="close-icon" onClick={deleteModalCloseHandler} />
            </IconBox>
            <TextBox>
              <div>해당 댓글을 삭제하시겠습니까?</div>
              <ModalButtons>
                <Button onClick={commentDeleteHandler}>예</Button>
                <Button onClick={deleteModalCloseHandler}>아니요</Button>
              </ModalButtons>
            </TextBox>
          </Content>
        </Container>
      ) : null}

      <Button
        width="30px"
        fontSize={0.8}
        border="0px"
        hoverBgColor="#7092bf"
        hoverColor="white"
        onClick={commentModifyHandler}>
        수정
      </Button>
      <Button
        width="30px"
        fontSize={0.8}
        border="0px"
        hoverBgColor="#7092bf"
        hoverColor="white"
        onClick={deleteModalOpenHandler}>
        삭제
      </Button>
    </div>
  );
};

function CommentDetail({
  commentList,
  setCommentList,
}: {
  commentList: Array<comment>;
  setCommentList: React.Dispatch<React.SetStateAction<Array<comment> | undefined>>;
}) {
  console.log(commentList);
  const USERID = useSelector((state: UserState) => state.user.id);
  const [isCommentModify, setIsCommentModify] = useState(0);

  return (
    <div className="post-comment-container">
      {commentList.map((item, index) => {
        const commentItem = item;
        if (commentItem.commentId === isCommentModify) {
          return (
            <CommentModify
              initComment={commentItem}
              commentList={commentList}
              setIsCommentModify={setIsCommentModify}
              setCommentList={setCommentList}
            />
          );
        }
        return (
          <div className="post-comment" key={index}>
            {/* 헤더 유저네임, item.usename 같은지 조건부 버튼 렌더 */}
            {commentItem.memberId === USERID ? (
              <CommentButtons
                comment={commentItem}
                setIsCommentModify={setIsCommentModify}
                commentList={commentList}
                setCommentList={setCommentList}
              />
            ) : (
              <div className="is-not-comment-btn"></div>
            )}
            <div className="comment-detail">
              <div className="comment-user">{item.username}</div>
              <div className="comment-detail-content">
                <div className="comment-content">{item.content}</div>
                <div className="comment-date">{item.createdAt}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CommentModify({
  initComment,

  commentList,
  setIsCommentModify,
  setCommentList,
}: {
  initComment: comment;

  commentList: Array<comment>;
  setIsCommentModify: React.Dispatch<React.SetStateAction<number>>;
  setCommentList: React.Dispatch<React.SetStateAction<Array<comment> | undefined>>;
}) {
  const USERACCESSTOKEN = useSelector((state: UserState) => state.user.accessToken);
  const APIURL = useSelector((state: ApiState) => state.api.APIURL);
  const [comment, setComment] = useState(initComment.content);

  function changeCommentHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment((event.target as HTMLTextAreaElement).value);
  }
  // 댓글 수정 버튼 클릭 함수
  function submitCommentHandler() {
    console.log(comment);
    const commentData = {
      content: comment,
    };
    if (comment === '') {
      alert('댓글 내용을 작성해야합니다.');
    } else {
      //댓글 수정 낙관적 업데이트
      if (commentList !== undefined) {
        const modifyCommentList = commentList.map(item => {
          if (item.commentId === initComment.commentId) {
            return {
              ...item,
              memberId: initComment.memberId,
              content: comment,
              username: initComment.username,
              createdAt: initComment.createdAt,
              updatedAt: initComment.updatedAt,
            };
          }
          return item;
        });
        setCommentList(modifyCommentList);
      }
      axios({
        method: 'patch',
        url: `${APIURL}/posts/comment/${initComment.commentId}`,
        data: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${USERACCESSTOKEN}`,
        },
      })
        .then(function () {
          console.log('댓글 수정 성공');
          setIsCommentModify(0);
          // window.location.reload();
        })
        .catch(error => {
          console.log(error);
          console.log('댓글 수정 실패');
        });
    }
  }
  return (
    <div className="post-comment-add">
      <div className="post-comment-add-user">{initComment.username}</div>
      <textarea
        className="post-comment-add-content"
        placeholder="댓글을 남겨주세요"
        value={comment}
        onChange={changeCommentHandler}></textarea>
      <div className="post-comment-submit">
        <Button width="70px" fontSize={1} hoverBgColor="#7092bf" hoverColor="white" onClick={submitCommentHandler}>
          수정
        </Button>
      </div>
    </div>
  );
}

function CommentAdd({
  commentList,
  setCommentList,
  postid,
}: {
  commentList: Array<comment> | undefined;
  setCommentList: React.Dispatch<React.SetStateAction<Array<comment> | undefined>>;
  postid: number | undefined;
}) {
  const USERACCESSTOKEN = useSelector((state: UserState) => state.user.accessToken);
  const USERID = useSelector((state: UserState) => state.user.id);
  const USERNAME = useSelector((state: UserState) => state.user.username);
  const APIURL = useSelector((state: ApiState) => state.api.APIURL);
  const [comment, setComment] = useState('');

  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const hours = ('0' + today.getHours()).slice(-2);
  const minutes = ('0' + today.getMinutes()).slice(-2);
  const seconds = ('0' + today.getSeconds()).slice(-2);

  const dateString = year + '-' + month + '-' + day;
  const timeString = hours + ':' + minutes + ':' + seconds;

  function changeCommentHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment((event.target as HTMLTextAreaElement).value);
  }
  // 댓글 등록 버튼 클릭 함수
  function submitCommentHandler() {
    const commentData = {
      content: comment,
    };

    if (comment === '') {
      alert('댓글 내용을 작성해야합니다.');
    } else {
      if (commentList !== undefined) {
        let initCommentId;
        if (commentList.length === 0) {
          initCommentId = 1;
        } else {
          initCommentId = commentList[commentList?.length - 1].commentId + 1;
        }
        setCommentList([
          ...commentList,
          {
            memberId: USERID,
            commentId: initCommentId,
            content: comment,
            username: USERNAME,
            createdAt: `${dateString} ${timeString}`,
            updatedAt: null,
          },
        ]);
        setComment('');
      }

      axios({
        method: 'post',
        url: `${APIURL}/posts/${postid}/comment`,
        data: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${USERACCESSTOKEN}`,
        },
      })
        .then(response => {
          console.log('댓글 등록 성공');
          console.log(response.data.commentId);

          if (commentList !== undefined) {
            setCommentList([
              ...commentList,
              {
                memberId: USERID,
                commentId: response.data.commentId,
                content: comment,
                username: USERNAME,
                createdAt: `${dateString} ${timeString}`,
                updatedAt: null,
              },
            ]);
            setComment('');
          }
        })
        .catch(error => {
          console.log(error);
          console.log('댓글 등록 실패');
        });
    }
  }
  return (
    <div className="post-comment-add">
      <div className="post-comment-add-user">{USERNAME}</div>
      <textarea
        className="post-comment-add-content"
        placeholder="댓글을 남겨주세요"
        value={comment}
        onChange={changeCommentHandler}></textarea>
      <div className="post-comment-submit">
        <Button width="70px" fontSize={1} hoverBgColor="#7092bf" hoverColor="white" onClick={submitCommentHandler}>
          등록
        </Button>
      </div>
    </div>
  );
}

function PostDetail({ post }: { post: postData }) {
  // const USERID = localStorage.getItem("id");
  const USERID = useSelector((state: UserState) => state.user.id);
  const USERACCESSTOKEN = useSelector((state: UserState) => state.user.accessToken);
  const APIURL = useSelector((state: ApiState) => state.api.APIURL);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeList, setLikeList] = useState<Array<string> | undefined>(post.likedByUserIds);
  const [likeCount, setLikeCount] = useState<number | undefined>(post.likes);
  const [commentList, setCommentList] = useState<Array<comment> | undefined>(post.comments);

  const navigate = useNavigate();
  function goToCommunityHandler() {
    navigate(`/community`);
  }

  //좋아요 상태 변경
  useEffect(() => {
    if (post.likedByUserIds !== undefined && post.postId !== undefined) {
      // if (post.myLikes.includes(UERID)) {}
      console.log(post.likedByUserIds);
      console.log(post.likedByUserIds.includes(USERID));
      if (post.likedByUserIds.includes(USERID)) {
        setIsLiked(true);
      }
    }
  }, []);

  // 좋아요 클릭시..요청
  function changeLikeHandler() {
    if (USERID === '0') {
      const tryLogin = confirm('회원만 이용 가능한 기능입니다. 로그인 하시겠습니까?');
      console.log(tryLogin);
      if (tryLogin) {
        navigate('/login');
      }
    } else {
      setIsLiked(!isLiked);
      if (likeCount !== undefined) {
        if (!isLiked && likeList !== undefined) {
          setLikeCount(likeCount + 1);
          if (!likeList.includes(USERID)) {
            setLikeList([...likeList, USERID]);
          }
        } else {
          setLikeCount(likeCount - 1);
          if (likeList !== undefined) {
            const deletedLiekList = likeList.filter(item => item !== USERID);
            setLikeList(deletedLiekList);
          }
        }
      }
      axios({
        method: 'post',
        url: `${APIURL}/posts/${post.postId}/likes`,
        headers: {
          Authorization: `${USERACCESSTOKEN}`,
        },
      })
        .then(() => {
          console.log('좋아요 성공');
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  return (
    <PostDetailLayout>
      <PostDetailHeader>
        <h2>{post.title}</h2>
        <div className="header-detail-container">
          <div className="header-detail">
            <div className="post-user">{post.username}</div>
            <div className="post-date">{post.createdAt}</div>
            <div className="post-view"> 조회수: {post.views}</div>
          </div>
          {USERID === post.memberId ? <HeaderButtons post={post} /> : null}
          {/* <HeaderButtons post={post} /> */}
        </div>
      </PostDetailHeader>
      <PostDetailContent>
        <div>{post.content ? <div dangerouslySetInnerHTML={{ __html: post.content }}></div> : null}</div>
      </PostDetailContent>
      <PostDetailFooter>
        <div className="lick-count-container">
          {isLiked && likeList?.includes(USERID) ? (
            <AiFillHeart className="aifillheart" onClick={changeLikeHandler} />
          ) : (
            <AiOutlineHeart className="aioutlineheart" onClick={changeLikeHandler} />
          )}
          <div>{likeCount}</div>
        </div>
        <Button
          width="65px"
          height="30px"
          borderRadius="15px"
          fontSize={1}
          hoverBgColor="#7092bf"
          hoverColor="white"
          onClick={goToCommunityHandler}>
          목록
        </Button>
      </PostDetailFooter>

      <PostFooter>
        {/* 댓글 리스트 map으로 */}
        {commentList ? <CommentDetail commentList={commentList} setCommentList={setCommentList} /> : null}
        {/* {post.comments ? <CommentDetail comment={post.comments} post={post} /> : null} */}
        {USERID !== '0' ? (
          <CommentAdd commentList={commentList} setCommentList={setCommentList} postid={post.postId} />
        ) : (
          // <div className="not-login-comment">
          //   로그인하시면 댓글을 작성할 수 있습니다. <Link to={'/login'}>로그인 페이지로...</Link>
          // </div>
          <div></div>
        )}
      </PostFooter>

      <CommunityButtonGroup left="77%" top="85%" />
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
  div.header-detail-container {
    display: flex;
    justify-content: space-between;
  }
  div.header-detail-container div.header-detail {
    font-size: 15px;
    display: flex;
  }
  div.header-detail-container div.header-detail div {
    margin: 3px 4px;
  }
  div.header-detail-container div.post-date {
    font-size: 15px;
  }
  div.header-buttons button {
    margin-left: 5px;
  }
  @media all and (max-width: 580px) {
    div.header-detail-container {
      display: block;
      /* justify-content: space-between; */
    }
  }
`;

const PostDetailContent = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 20px;
  background-color: #fcfcfc;
  border: 1px solid #a8adaf;
  border-radius: 15px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  div.lick-count-container svg.aifillheart {
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
  div.not-login-comment {
    padding: 10px;
    margin-bottom: 10px;
    background-color: #fcfcfc;
    border: 1px solid #a8adaf;
    border-radius: 15px;
  }
  div.post-comment-container div.post-comment {
    padding: 10px;
    margin-bottom: 10px;
    background-color: #fcfcfc;
    border: 1px solid #a8adaf;
    border-radius: 15px;
    /* display: flex; */
  }

  div.post-comment-container div.post-comment div.is-not-comment-btn {
    height: 10px;
  }

  div.post-comment div.comment-user {
    width: 80px;
    font-size: 16px;
    font-weight: 600;
    padding: 0 15px;
  }
  div.post-comment div.comment-content {
    font-size: 16px;
    padding: 0px;
    padding: 10px 15px;
    justify-content: left;
  }
  div.post-comment div.comment-date {
    display: flex;
    justify-content: right;
    font-size: 12px;
    color: gray;
  }
  div.post-comment div.comment-buttons {
    display: flex;
    justify-content: right;
    padding: 0px 10px;
  }
  div.post-comment-add {
    margin: 5px 0px;
    padding: 10px;
    background-color: #fcfcfc;
    border: 1px solid #a8adaf;
    border-radius: 15px;
  }
  div.post-comment-add div.post-comment-add-user {
    font-size: 16px;
    font-weight: 600;
    padding: 10px;
  }
  div.post-comment-add textarea.post-comment-add-content {
    margin-top: 5px;
    width: 100%;
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  z-index: 30;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  width: 20rem;
  max-height: 20rem;
  background-color: #fff;
  border-radius: 30px;
  padding: 2rem;
  z-index: 1;
  overflow: auto;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: flex-end;

  .close-icon {
    cursor: pointer;
  }
`;
const TextBox = styled.div``;
