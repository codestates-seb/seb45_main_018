import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

const ChatContent = ({ currentRoomId, currentUserId }) => {
  const username = useSelector((state: RootState) => state.user.username);

  const [messages, setMessages] = useState([]);
  const [tempmes, setTempmessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, tempmes]);
  

  const handleTextChange = e => {
    setNewMessage(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`; // 최대 높이를 200px로 설정
  };

  useEffect(() => {
    async function fetchMessages() {
      if (currentRoomId) {
        try {
          const response = await axios.get(`https://yourserver.com/api/chatrooms/${currentRoomId}/messages`);
          setMessages(response.data);
        } catch {
          setMessages([{ message_id: 1, sender_id: '시스템', content: '안녕하세요' }]);
        }
      }
    }

    fetchMessages();
  }, [currentRoomId]);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(`https://yourserver.com/api/chatrooms/${currentRoomId}/messages`, {
        sender_id: currentUserId,
        content: newMessage,
      });
      if (response.status === 200) {
        setMessages([
          ...messages,
          { message_id: response.data.message_id, sender_id: currentUserId, content: newMessage },
        ]);
        setNewMessage('');
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'; // textarea의 높이 초기화
        }
      }
      scrollToBottom();
    } catch {
      const tempMessageId = Math.random(); // 임시로 메시지 ID를 생성
      setTempmessages([...tempmes, { message_id: tempMessageId, sender_id: username, content: newMessage }]);
      setNewMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // textarea의 높이 초기화
      }
    //   scrollToBottom();
    }
  };

  return (
    <div>
      <MessagesContainer>
        <Messages>
          {messages.concat(tempmes).map(
            (
              message, // messages와 tempmes를 합쳐서 렌더링
            ) => (
              // <Message key={message.message_id} isSentByCurrentUser={message.sender_id === currentUserId}>
              <Message key={message.message_id} isSentByCurrentUser={message.sender_id === 'user'}>
                {/*임시로 현재가 user라서 이렇게 설정함.*/}
                {/* <Sender>{message.sender_id}:</Sender> */}
                <span>{message.content}</span>
                {/* <div ref={messagesEndRef} /> */}

              </Message>
                          ),
          )}
        </Messages>
        <InputContainer>
          <InputText
            ref={textareaRef}
            value={newMessage}
            onChange={handleTextChange}
            onInput={handleTextChange}
            onKeyPress={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <InputButton onClick={handleSendMessage}>전송</InputButton>
        </InputContainer>
      </MessagesContainer>
    </div>
  );
};

export default ChatContent;

const MessagesContainer = styled.div`
border: #E5E5E5 solid 1px;
border-radius: 20px;
padding: 20px;

height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Messages = styled.div`
  overflow: auto; // 추가
  height: 700px; // 예시로 700px로 설정했지만, 원하는 높이로 조절하세요.
`;

const Message = styled.div`
  overflow: auto; // 추가
  display: flex;
  white-space: pre-line;
  flex-direction: column;
  max-width: 80%; // 최대 폭을 80%로 설정, 필요에 따라 조정 가능
  min-width: 100x;
  line-height: 25px;
  margin-bottom: 10px;
  text-align: left; // 메시지 내용은 항상 왼쪽 정렬
  background-color: ${props => (props.isSentByCurrentUser ? '#F4EFDC' : '#E6DAF3')};
  border-radius: 20px;
  padding: 15px 20px 15px 20px; // 메시지 내용 주변에 약간의 패딩 추가
  box-sizing: border-box; // 패딩을 포함한 크기로 박스 사이즈 계산
  float: ${props =>
    props.isSentByCurrentUser
      ? 'right'
      : 'left'}; // 현재 사용자가 보낸 메시지는 오른쪽에, 그렇지 않은 메시지는 왼쪽에 배치
  clear: both; // 다음 메시지가 이전 메시지 아래에 오게 함
`;

const Sender = styled.strong`
  margin-right: 10px;
`;

const InputContainer = styled.div`
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 20px;
  border: none;
  background-color: #f4f4f4;
  min-height: 45px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const InputText = styled.textarea`
  border-radius: 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 15px;
  width: 100%;
  font-size: 20px;
  border: none;
  background-color: #f4f4f4;
  resize: none;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  overflow-wrap: break-word;
  overflow: visible;
  max-height: 300px; // textarea의 최대 높이 설정
`;

const InputButton = styled.button`
  border: none;
  width: 70px;
  height: 45px;
  border-radius: 10px;
  background-color: black;
  font-size: 18px;
  color: white;
  margin-left: 10px;
`;
