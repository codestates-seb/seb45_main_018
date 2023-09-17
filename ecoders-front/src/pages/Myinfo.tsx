import { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import profileImg from '../assets/ProfileImage.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUsername, setStamp } from '../redux/slice/userSlice';
import { RootState } from '../redux/store/store';
import shiningImg from '../assets/shining.png';
import hills from '../assets/hills.png';

const MyInfo = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.user.username); // username 상태 가져오기
  const memberId = useSelector((state: RootState) => state.user.id);

  // const stamp = useSelector((state: RootState) => state.user.stamp);

  // const [data, setData] = useState({
  //   username: 'user',
  //   email: 'polareco@gmail.com',
  //   profileImage: { profileImg },
  //   day: 'Mon',
  //   stamp: 3,
  //   achievement: { //6단계(0-5)
  //     Mon: 0,
  //     Tue: 0,
  //     Wed: 0,
  //     Thur: 0,
  //     Fri: 0,
  //     Sat: 0,
  //     Sun: 0,
  //   },
  //   badges: {
  //     '북극곰 연인': false,
  //     '가까운 거리 탐험가': false,
  //     '스탬프 수집가': false,
  //     '티끌모아 피카츄': false,
  //     '세상의 소금': false,
  //     '대지의 어머니': false,
  //   },
  // });



  const APIURL = useSelector((state: RootState) => state.api.APIURL);

  useEffect(() => {
    axios
      .get(`${APIURL}/members/${memberId}`)
      .then(res => {
        dispatch(setUsername(res.data.username));
        dispatch(setStamp(res.data.stamp));
      })
      .catch(error => {
        console.log(error, '데이터를 불러오는데 실패했습니다.');
      });
  }, []);

  const day = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  const DayComponent = day.map(a => {
    return (
      <DayHillContainer>
        <DayContainer>
          <Day>{a}</Day>
          <img src={hills} width="67px" height="67px" />
        </DayContainer>
      </DayHillContainer>
    );
  });

  const badge = ['북극곰 연인', '가까운 거리 탐험가', '스탬프 수집가'];
  const BadgeComponent = badge.map((a) => {
    return (
      <UserBadgeContainer>
        <UserBadge>{a}</UserBadge>
        {/* 어떻게 불러올 것인지 고민하기  -> grid 찾아보기 */}
      </UserBadgeContainer>
    );
  });

  return (
    <div>
      <MyInfoContainer>
        <ProfileContainer>
          <ProfileImg src={profileImg} />
          <Username>{username}</Username>
          <Email>email@official.com</Email>
          <PasswordReset>비밀번호 변경</PasswordReset>
        </ProfileContainer>
        <StampBadgeContainer>
          <StampContainer>
            <StampBadgeTitleContainer>
              <img src={shiningImg} width="30px" height="30px" />
              <MyInfoTitle>Stamps: 알록달록 지구를 채워주세요!</MyInfoTitle>
            </StampBadgeTitleContainer>
            <img src={hills} width="220px" height="220px" />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>{DayComponent}</div>
          </StampContainer>
          <BadgeContainer>
            <StampBadgeTitleContainer>
              <img src={shiningImg} width="30px" height="30px" />
              <MyInfoTitle>Badges</MyInfoTitle>
            </StampBadgeTitleContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {BadgeComponent}
            </div>
          </BadgeContainer>
        </StampBadgeContainer>
      </MyInfoContainer>
    </div>
  );
};

export default MyInfo;

const MyInfoContainer = styled.div`
  display: flex;
  gap: 77px;
`;

const ProfileContainer = styled.div`
  border-radius: 21px;
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 366px;
  height: 385px;
  margin-left: 100px;
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
  margin-top: 16px;
`;

const Email = styled.div`
  color: #abafb3;
  text-align: center;
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin-top: 51px;
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
  margin-top: 33px;
  cursor: pointer;
`;

const StampBadgeContainer = styled.div`
  width: 778px;
  height: 672px;
  margin-top: 186px;
`;

const StampContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 725px;
  height: 378px;
  padding: 20px;
  margin-bottom: 20px;
`;

const StampBadgeTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MyInfoTitle = styled.div`
  margin-left: 10px;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Syne', sans-serif;
`;

const DayHillContainer = styled.div`
  display: flex;
  justify-content: start;
  /* padding: 20px; */
`;

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Day = styled.div`
  width: 80px;
  font-size: 28px;
  font-weight: 600;
  font-family: 'Syne', sans-serif;
  display: flex;
  justify-content: center;
`;

const BadgeContainer = styled.div`
  width: 725px;
  height: 230px;
  margin-left: 20px;
`;

const UserBadgeContainer = styled.div`
  display: flex;
  width: 642px;
  height: auto;
  margin-top: 40px;
  gap: 16px;
`;
const UserBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Syne', sans-serif;
  font-weight: bold;
  width: 203px;
  height: 60px;
  border-radius: 10px;
  background-color: #fefefe;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
