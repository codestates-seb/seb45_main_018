import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import profileImg from '../assets/ProfileImage.svg';

const MyInfo = () => {
  const [data, setData] = useState({
    username: 'user',
    email: 'polareco@gmail.com',
    profileImage: { profileImg },
    day: 'Mon',
    todayMissionCount: 0,
    achievement: { //6단계(0-5)
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thur: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    },
    badges: {
      '북극곰 연인': false,
      '가까운 거리 탐험가': false,
      '스탬프 수집가': false,
      '티끌모아 피카츄': false,
      '세상의 소금': false,
      '대지의 어머니': false,
    },
  });

  useEffect(() => {
    axios
      .get('/api/myinfo')
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.log('데이터를 불러오는데 실패했습니다.');
      });
  }, []);

  return (
    <div>
      <MyInfoContainer>
        <ProfileImg src={profileImg} />
        <Username>{data.username}</Username>
        <Email>{data.email}</Email>
        <PasswordReset>비밀번호 변경</PasswordReset>
      </MyInfoContainer>
      <StampContainer>
        <p>오늘의 미션 달성 갯수: {data.todayMissionCount}</p>
        <div>
        <h2>날짜별 달성 정도</h2>
        </div>
        <div>
        <h2>뱃지</h2>
        </div>
      </StampContainer>
    </div>
  );
};

export default MyInfo;

const MyInfoContainer = styled.div`
  border-radius: 21px;
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 366px;
  height: 385px;
  margin-left: 362px;
  margin-top: 193px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 128px;
  height: 128px;
  margin-top: 40px;
`;

const Username = styled.div`
  color: #000;
  text-align: center;
  font-family: 'Inter';
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 54px; /* 300% */
`;

const Email = styled.div`
  color: #abafb3;
  text-align: center;
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const PasswordReset = styled.button`
  border-radius: 5px;
  border: 1px solid #e4e6ef;
  background: #f4f5f8;
  width: 142px;
  height: 26px;
  color: #7b8994;
  text-align: center;
  font-family: 'Inter';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const StampContainer = styled.div`
  width: 778px;
  height: 672px;
  margin-left: 805px;
  margin-top: 186px;
  background-color: #7b8994;
`;
