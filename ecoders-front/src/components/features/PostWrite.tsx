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

function PostWrite() {
  return (
    <PostWriteLayout>
      <PostWriteBody>
        <EditorComponent />
      </PostWriteBody>
    </PostWriteLayout>
  );
}

export default PostWrite;

const PostWriteLayout = styled.div`
  width: 100%;
`;

const PostWriteBody = styled.div`
  width: 64%;
  height: auto;
  background-color: #eceff1;
  display: flex;
  margin: 0 auto;
  border-radius: 15px;
`;
