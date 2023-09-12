import { styled } from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../redux/slice/modalSlice';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import { post, comment } from '../../pages/CommunityPostDetailPage';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';
import axios from 'axios';

import DefaultThumbnail from '../../assets/Default-Thumbnail.png';

type ApiState = {
  api: {
    APIURL: string;
  };
};

export interface postData {
  title: string;
  content: string;
  imgeUrl: string | null;
  category: string;
}

interface headerProps {
  title: string;
  category: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}
interface bodyProps {
  content: string;
  thumbnailUrl: string | null;
  setContent: React.Dispatch<React.SetStateAction<string>>;
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
        <option value="응모글">응모글</option>
      </select>
    </div>
  );
}
// const PostWriteBody = ({ dummyData }: { dummyData: post })
function PostWriteBody({ bodyData }: { bodyData: bodyProps }) {
  const editorRef = useRef<Editor>(null);
  const dispatch = useDispatch();

  // 이미지 업로드 서버로 보내는 로직
  const APIURL = useSelector((state: ApiState) => state.api.APIURL);
  type HookCallback = (url: string, text?: string) => void;
  const uploadImageHandler = async (blob: Blob | File, callback: HookCallback) => {
    console.log(blob);
    const formData = new FormData();
    formData.append('imageFile', blob);

    console.log(formData.has('image'));
    axios({
      method: 'post',
      url: `${APIURL}/posts/uploadImage`, // 적절한 엔드포인트로 변경해야 합니다. (이거 맞나..?)
      // test url
      // url: 'http://ec2-3-39-194-121.ap-northeast-2.compute.amazonaws.com:8080/posts/uploadImage',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('axios 이미지 업로드 성공');
        console.log(response.data);
        const imageUrl = `${response.data}`;
        callback(imageUrl, 'img');
      })
      .catch(error => {
        console.error('axios 이미지 업로드 실패', error);
        callback('image_load_fail', 'image_load_fail');
      });
    return false;
  };

  // console.log(dummyData.content);

  const submitButtonClickHandler = () => {
    // 확인 모달
    const data = editorRef.current?.getInstance().getHTML() || '';
    // markdown.. or 내용만 필요할 경우:
    // const markdownData = editorRef.current?.getInstance();
    // const content = markdownData.getMarkdown();

    // content 설정
    console.log(data);
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
      //   console.log(imgTag);
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
      <Modal className="post-upload" modalType="postModal">
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
          initialValue={''}
          height="550px"
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
            fontSize={0.5}
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

//수정 로직.. 미완성
// function PostWrite({ dummyData }: { dummyData: post }) {
function PostWrite() {
  const navigate = useNavigate();
  const APIURL = useSelector((state: ApiState) => state.api.APIURL);

  // console.log(dummyData);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>('');

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  // if(수정 데이터 들어오면 처리하는 부분)

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

  const postData: postData = {
    title: title,
    content: content,
    imgeUrl: thumbnailUrl,
    category: category,
  };

  useEffect(() => {
    if (isSubmit) {
      const postD = JSON.stringify(postData);
      console.log(postD);
      navigate(`/community`);
      axios({
        method: 'post',
        url: `${APIURL}/posts`,
        data: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          console.log('게시물 등록 성공');
          if (response.status === 200) {
            navigate(`/community`);
          }
        })
        .catch(error => {
          console.log(error);
          console.log('게시물 등록 실패');
        });
    }
  }, [isSubmit]);

  return (
    <PostWriteLayout>
      <PostWriteForm>
        <PostWriteHeader headerData={headerData} />
        {/* <PostWriteBody dummyData={dummyData} /> */}
        <PostWriteBody bodyData={bodyData} />
      </PostWriteForm>
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
    height: 30px;
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
