import { styled } from 'styled-components';
import { useRef, useState, useMemo } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditorComponent = () => {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState('');

  // quill에서 사용할 모듈을 설정하는 코드 입니다.
  // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['link', 'image', 'video'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
        ],
        // handlers: {
        //   image: imageHandler,
        // },
      },
    }),
    [],
  );

  return (
    <>
      <ReactQuill
        ref={element => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
    </>
  );
};

const PostWriteHeader = () => {
  return (
    <div className="post-write-header">
      <input type="text" name="" id="" />
      <select name="category" defaultValue="전체">
        <option value="전체">전체</option>
        <option value="모집글">모집글</option>
        <option value="응모글">응모글</option>
      </select>
    </div>
  );
};

const PostWriteBody = () => {
  return (
    <div className="post-write-body">
      <EditorComponent />
    </div>
  );
};

const PostSubmit = () => {
  return (
    <div className="submit-button-container">
      <button>등록</button>
    </div>
  );
};

function PostWrite() {
  return (
    <PostWriteLayout>
      <PostWriteForm>
        <PostWriteHeader />
        <PostWriteBody />
        <PostSubmit />
      </PostWriteForm>
    </PostWriteLayout>
  );
}

export default PostWrite;

const PostWriteLayout = styled.div`
  width: 100%;
`;

const PostWriteForm = styled.div`
  width: 65%;
  height: auto;
  background-color: #eceff1;
  margin: 0 auto;
  padding: 10px;
  border-radius: 15px;
  justify-content: center;
  div.post-write-header {
    display: flex;
    margin: 5px 0;
    justify-content: space-between;
  }
  div.post-write-body {
  }
  div.submit-button-container {
    display: flex;
    justify-content: right;
    margin: 5px 0;
  }
`;
