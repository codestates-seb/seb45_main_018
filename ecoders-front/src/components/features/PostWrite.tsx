// import { styled } from 'styled-components';
// import { useRef, useState, useMemo, useEffect } from 'react';

// // import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { Editor } from '@toast-ui/react-editor';
// import '@toast-ui/editor/dist/toastui-editor.css';

// import { post, comment } from '../../pages/CommunityPostDetailPage';
// import Button from '../atoms/Button';

// const PostWriteHeader = () => {
//   return (
//     <div className="post-write-header">
//       <input className="post-write-title" type="text" placeholder="Title" />
//       <select className="post-select-category" name="category" defaultValue="전체">
//         <option value="전체">전체</option>
//         <option value="모집글">모집글</option>
//         <option value="응모글">응모글</option>
//       </select>
//     </div>
//   );
// };
// // const PostWriteBody = ({ dummyData }: { dummyData: post }) => {
// const PostWriteBody = () => {
//   const editorRef = useRef<Editor>(null);

//   // console.log(dummyData.content);
//   const submitButtonClickHandler = () => {
//     const content = editorRef.current?.getInstance();
//     const data = editorRef.current?.getInstance().getHTML() || '';
//     // markdown..
//     const data2 = content.getMarkdown();
//     console.log(data2);
//     console.log(data);
//   };
//   type HookCallback = (url: string, text?: string) => void;
//   //서버로 보내는 로직
//   const uploadImageHandler = async (blob: Blob | File, callback: HookCallback) => {
//     console.log(blob);
//     // uploadImage가 그 서버로 보내는 함수인것 같아요..1
//     // const url = await uploadImage(blob);
//     // callback(url, 'alt text');
//     return false;
//   };
//   toString();
//   return (
//     <div className="post-write-body">
//       <Editor
//         initialValue={'dummyData.content'}
//         height="550px"
//         initialEditType="wysiwyg"
//         hideModeSwitch={true}
//         useCommandShortcut={false}
//         ref={editorRef}
//         placeholder="content"
//         // hooks={{
//         //   addImageBlobHook: uploadImageHandler,
//         // }}
//       />
//       <div className="submit-button-container">
//         <Button
//           width="80px"
//           fontSize={0.5}
//           hoverBgColor="#7092bf"
//           hoverColor="white"
//           onClick={submitButtonClickHandler}>
//           등록
//         </Button>
//       </div>
//     </div>
//   );
// };
// //수정 로직.. 미완성
// // function PostWrite({ dummyData }: { dummyData: post }) {
// function PostWrite() {
//   // console.log(dummyData);
//   return (
//     <PostWriteLayout>
//       <PostWriteForm>
//         <PostWriteHeader />
//         {/* <PostWriteBody dummyData={dummyData} /> */}
//         <PostWriteBody />
//       </PostWriteForm>
//     </PostWriteLayout>
//   );
// }

// export default PostWrite;

// const PostWriteLayout = styled.div`
//   width: 100%;
// `;

// const PostWriteForm = styled.div`
//   border: 1px solid #a8adaf;
//   width: 65%;
//   height: auto;
//   background-color: #eceff1;
//   margin: 0 auto;
//   padding: 10px;
//   border-radius: 15px;
//   justify-content: center;
//   div.post-write-header {
//     display: flex;
//     margin: 5px 0 10px 0;
//     justify-content: space-between;
//   }
//   div.post-write-header .post-select-category {
//     width: 100px;
//     border-radius: 10px;
//     border: 1.5px solid #afafaf;
//   }
//   div.post-write-header .post-write-title {
//     width: 83%;
//     border: 1.5px solid #afafaf;
//     padding: 0 10px;
//     height: 30px;
//     border-radius: 10px;
//   }
//   div.post-write-body {
//   }
//   div.submit-button-container {
//     display: flex;
//     height: 30px;
//     justify-content: right;
//     margin-top: 10px;
//   }
// `;
