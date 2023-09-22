import { styled } from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../redux/slice/modalSlice';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import { postData } from '../../pages/CommunityPostDetailPage';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';
import axios from 'axios';

import DefaultThumbnail from '../../assets/Default-Thumbnail.png';
import Loading from '../sharedlayout/Loading';

type ApiState = {
  api: {
    APIURL: string;
  };
};

type UserState = {
  user: {
    accessToken: string | null;
    refreshToken: string | null;
    username: string;
    id: string;
    // id: number;
    stamp: number;
  };
};

export interface postWriteData {
  title: string | undefined;
  content: string | undefined;
  thumbnailUrl: string | null;
  category: string | undefined;
}

interface headerProps {
  title: string | undefined;
  category: string | undefined;
  setTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
}
interface bodyProps {
  content: string | undefined;
  thumbnailUrl: string | null;
  setContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  setThumbnailUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

function PostWriteHeader({ headerData }: { headerData: headerProps }) {
  function changeTitleHandler(event: React.ChangeEvent<HTMLInputElement>) {
    headerData.setTitle((event.target as HTMLInputElement).value);
  }
  function changeCategoryHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    headerData.setCategory((event.target as HTMLSelectElement).value);
  }
  return (
    <div className="post-write-header">
      <input
        className="post-write-title"
        type="text"
        placeholder="Title"
        value={headerData.title}
        onChange={changeTitleHandler}
      />
      <select
        className="post-select-category"
        name="category"
        defaultValue="전체"
        value={headerData.category}
        onChange={changeCategoryHandler}>
        <option value="전체">전체</option>
        <option value="모집글">모집글</option>
        <option value="인증글">인증글</option>
      </select>
    </div>
  );
}

function PostWriteBody({ bodyData }: { bodyData: bodyProps }) {
  const editorRef = useRef<Editor>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (bodyData.content !== '') {
      editorRef.current?.getInstance().setHTML(bodyData.content);
    }
  }, []);

  // 이미지 업로드 서버로 보내는 로직
  const APIURL = useSelector((state: ApiState) => state.api.APIURL);
  const USERACCESSTOKEN = useSelector((state: UserState) => state.user.accessToken);
  const USERREFRESHTOKEN = useSelector((state: UserState) => state.user.refreshToken);

  type HookCallback = (url: string, text?: string) => void;
  const uploadImageHandler = async (blob: Blob | File, callback: HookCallback) => {
    const formData = new FormData();
    formData.append('imageFile', blob);

    axios({
      method: 'post',
      url: `${APIURL}/posts/uploadImage`, // 적절한 엔드포인트로 변경해야 합니다. (이거 맞나..?)
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${USERACCESSTOKEN}`,
        'Refresh-Token': `${USERREFRESHTOKEN}`,
      },
    })
      .then(response => {
        //console.log('axios 이미지 업로드 성공');
        //console.log(response.data);
        const imageUrl = `${response.data}`;
        callback(imageUrl, 'img');
      })
      .catch(error => {
        console.error('axios 이미지 업로드 실패', error);
        callback('image_load_fail', 'image_load_fail');
      });
    return false;
  };

  const submitButtonClickHandler = () => {
    // 확인 모달
    const data = editorRef.current?.getInstance().getHTML() || '';
    // markdown.. or 내용만 필요할 경우:
    // const markdownData = editorRef.current?.getInstance();
    // const content = markdownData.getMarkdown();

    // content 설정
    //console.log(data);
    bodyData.setContent(data);

    // thumbnailUrl설정
    const imgTags: HTMLImageElement[] = Array.from(
      new DOMParser().parseFromString(data, 'text/html').querySelectorAll('img'),
    );
    if (imgTags.length === 0) {
      console.log('data에 img 태그가 없습니다. default 썸네일로 설정합니다.');
      bodyData.setThumbnailUrl(DefaultThumbnail);
    } else {
      // img 태그가 존재할 경우 첫 등록한 이미지를 썸네일로 지정
      // imgTags 배열에 있음 imgTag.getAttribute('src');
      bodyData.setThumbnailUrl(imgTags[0].getAttribute('src'));
      // imgTags.forEach((imgTag: HTMLImageElement) => {
      // });
    }
    dispatch(openModal('postModal'));
  };

  const submitModalClickHandler = () => {
    dispatch(closeModal('postModal'));
    bodyData.setIsSubmit(true);
  };

  return (
    <>
      {/* 등록 버튼 클릭시 모달 */}
      <Modal className="post-upload" modaltype="postModal">
        <div>해당 게시글을 등록하시겠습니까?</div>
        <ModalButtons>
          <Button onClick={submitModalClickHandler}>예</Button>
          <Button
            onClick={() => {
              dispatch(closeModal('postModal'));
            }}>
            아니요
          </Button>
        </ModalButtons>
      </Modal>
      <div className="post-write-body">
        <Editor
          height="490px"
          initialEditType="wysiwyg"
          hideModeSwitch={true}
          useCommandShortcut={false}
          ref={editorRef}
          placeholder="content"
          autofocus={false}
          hooks={{
            addImageBlobHook: uploadImageHandler,
          }}
        />
        <div className="submit-button-container">
          <Button
            width="80px"
            fontSize={1}
            hoverBgColor="#7092bf"
            hoverColor="white"
            onClick={submitButtonClickHandler}>
            등록
          </Button>
        </div>
      </div>
    </>
  );
}
// function PostWrite({ postid, post }: { postid: number; post: postData }) {

function PostWrite({ post }: { post: postData }) {
  const navigate = useNavigate();
  const USERACCESSTOKEN = useSelector((state: UserState) => state.user.accessToken);
  const USERREFRESHTOKEN = useSelector((state: UserState) => state.user.refreshToken);
  const APIURL = useSelector((state: ApiState) => state.api.APIURL);

  const [title, setTitle] = useState<string | undefined>('');
  const [category, setCategory] = useState<string | undefined>('');
  const [content, setContent] = useState<string | undefined>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModify, setIsModify] = useState<boolean>(false);

  //게시글 수정일 경우
  useEffect(() => {
    axios
      .get(`${APIURL}/posts/${post.postId}`)
      .then(function (response) {
        setIsModify(true);
        setTitle(response.data.title);
        setCategory(response.data.category);
        setContent(response.data.content);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const headerData: headerProps = {
    title: title,
    category: category,
    setTitle: setTitle,
    setCategory: setCategory,
  };

  const bodyData: bodyProps = {
    content: content,
    thumbnailUrl: thumbnailUrl,
    setContent: setContent,
    setThumbnailUrl: setThumbnailUrl,
    setIsSubmit: setIsSubmit,
  };

  const postData: postWriteData = {
    title: title,
    content: content,
    thumbnailUrl: thumbnailUrl,
    category: category,
  };

  useEffect(() => {
    if (isSubmit) {
      // 게시물 수정
      if (isModify) {
        if (postData.title !== '' && postData.content !== '<p><br></p>') {
          axios({
            method: 'patch',
            url: `${APIURL}/posts/${post.postId}`,
            data: JSON.stringify(postData),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${USERACCESSTOKEN}`,
              'Refresh-Token': `${USERREFRESHTOKEN}`,
            },
          })
            .then(response => {
              //console.log('게시물 수정 성공');
              if (response.status === 200) {
                navigate(`/community/postdetail/${post.postId}`);
              }
            })
            .catch(error => {
              console.log(error);
              //console.log('게시물 수정 실패');
            });
        } else {
          alert('게시글 제목, 내용을 작성해야합니다.');
          window.location.reload();
        }
      }
      // 게시물 등록
      else {
        if (postData.title !== '' && postData.content !== '<p><br></p>') {
          axios({
            method: 'post',
            url: `${APIURL}/posts`,
            data: JSON.stringify(postData),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${USERACCESSTOKEN}`,
              'Refresh-Token': `${USERREFRESHTOKEN}`,
            },
          })
            .then(response => {
              //console.log('게시물 등록 성공');
              if (response.status === 200) {
                navigate(`/community`);
              }
            })
            .catch(error => {
              console.log(error);
              //console.log('게시물 등록 실패');
            });
        } else {
          alert('게시글 제목, 내용을 작성해야합니다.');
          window.location.reload();
        }
      }
    }
  }, [isSubmit]);

  return (
    <PostWriteLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <PostWriteForm>
          <PostWriteHeader headerData={headerData} />
          <PostWriteBody bodyData={bodyData} />
        </PostWriteForm>
      )}
    </PostWriteLayout>
  );
}

export default PostWrite;

const PostWriteLayout = styled.div`
  width: 100%;
`;

const PostWriteForm = styled.div`
  border: 1px solid #a8adaf;
  width: 65%;
  height: auto;
  background-color: #eceff1;
  margin: 0 auto;
  padding: 10px;
  border-radius: 15px;
  justify-content: center;

  div.post-write-header {
    display: flex;
    margin: 5px 0 10px 0;
    justify-content: space-between;
  }
  div.post-write-header .post-select-category {
    width: 100px;
    border-radius: 10px;
    border: 1.5px solid #afafaf;
  }
  div.post-write-header .post-write-title {
    width: 83%;
    border: 1.5px solid #afafaf;
    padding: 0 10px;
    height: 35px;
    border-radius: 10px;
  }
  div.post-write-body {
  }
  div.submit-button-container {
    display: flex;
    height: 30px;
    justify-content: right;
    margin-top: 10px;
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
