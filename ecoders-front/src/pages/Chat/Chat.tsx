// import styled from 'styled-components';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store/store';
// import { useState } from 'react';
// import axios from 'axios';
// import ChatContent from './\bChatContent';
// // import { useEffect } from 'react';

// const Chat = () => {

//   const [curChatUser, setCurChatUser] = useState("")
//   const [selectedRoomId, setSelectedRoomId] = useState("");
//   console.log(curChatUser)
//   const APIURL = useSelector((state:RootState) => state.api.APIURL)
//   const currentUserId = useSelector((state:RootState) => state.user.id)

//   const [chatContent, setChatContent] = useState('');
//   console.log(chatContent)

//   const fetchChatContent = async(userName:string) => {
//     try {
//       const response = await axios.get(APIURL);
//       setChatContent(response.data.chat);
//       console.log(userName)
//     } catch(error) {
//       console.error("Error fetching chat content: ", error)
//     }
//   }

//   // dummy data로 받아올 때
//   const randomUserList = ['아름', '연주', '민수', '석완', '은별', '진호'];
//   const userMap = randomUserList.map(a => {
//     return (
//       <UserContainer key={a} onClick={()=> {fetchChatContent(a); setCurChatUser(a); setSelectedRoomId(a)}}>
//         <UserNameContainer>
//           <UserProfile></UserProfile>
//           <UserName>{a}</UserName>
//         </UserNameContainer>
//       </UserContainer>
//     );
//   });

// // 서버 데이터로 받아올 때
// // const [rooms, setRooms] = useState([]);

// // useEffect(() => {
// //   async function fetchRooms() {
// //       try {
// //           const response = await axios.get('https://yourserver.com/api/chatrooms');
// //           setRooms(response.data);
// //       } catch (error) {
// //           console.error("채팅방 정보를 불러오는데 실패했습니다:", error);
// //       }
// //   }

// //   fetchRooms();
// // }, []);

// // const roomList = rooms.map(room => {
// //   return(
// //     <UserContainer key={room.room_id} onClick={()=> {fetchChatContent(room.user1_id); setCurChatUser(room.user1_id);}}>
// //     <UserNameContainer>
// //       <UserProfile></UserProfile>
// //       <UserName>{room.user1_id}</UserName>
// //     </UserNameContainer>
// //   </UserContainer>
// //   )
// // })

//   return (
//     <>
//       <UserChatContainer>
//         <UserListContainer>
//           <ChatTitle>Chat</ChatTitle>
//           <NewChatButton>새 메시지 작성하기</NewChatButton>
//           <DMList>Direct Messages</DMList>
//           {userMap} {/* 더미데이터일때*/}
//           {/* {roomList} //서버데이터일 때 */}
//         </UserListContainer>

//         <ChatContainer>
//           <VacantContainer></VacantContainer>
//           <ChatTitle>Chat with {curChatUser}</ChatTitle>
//           <MessageContainer>

//             <ChatContent currentRoomId={selectedRoomId} currentUserId={currentUserId}/>

//           </MessageContainer>
//         </ChatContainer>
//       </UserChatContainer>
//     </>
//   );
// };

// export default Chat;

// const UserChatContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   padding-top: 150px;
// `;

// const ChatTitle = styled.div`
//   font-size: 30px;
//   font-weight: bold;
//   padding-left: 20px;
// `;
// const NewChatButton = styled.button`
//   background-color: black;
//   color: white;
//   border-radius: 20px;
//   width: 251px;
//   height: 65px;
//   font-size: 15px;
//   cursor: pointer;
// `;
// const DMList = styled.div`
//   font-size: 20px;
//   font-weight: 500px;
//   padding-left: 10px;
// `;

// const UserListContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: start;
//   gap: 25px;
// `;

// const UserContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 248px;
//   height: auto;
//   border-radius: 15px;

//   &:hover {
//     background-color: #f4f4f4;
//     cursor: pointer;
//   }
// `;

// const UserNameContainer = styled.div`
//   color: #abafb3;
//   width: 248px;
//   height: 60px;
//   display: flex;
//   justify-content: start;
//   align-items: center;
//   gap: 13px;
//   padding-left: 11px;
// `;

// const UserProfile = styled.div`
//   width: 50px;
//   height: 50px;
//   background-color: black;
//   border-radius: 50px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const UserName = styled.div`
//   font-size: 20px;
//   font-weight: bold;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: black;
// `;

// const ChatContainer = styled.div`
//   width: 1058px;
//   height: 1000px;
//   display: flex;
//   flex-direction: column;
//   padding-left: 50px;
// `;

// const VacantContainer = styled.div`
//   width: 1058px;
//   height: 75px;
// `;

// const MessageContainer = styled.div`
// width: 70%;
// padding: 10px;

// `
