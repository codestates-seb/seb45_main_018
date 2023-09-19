import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUsername, setProfileImg } from '../redux/slice/userSlice';
import { RootState } from '../redux/store/store';
import shiningImg from '../assets/shining.png';
import hills from '../assets/hills.png';
import { FiChevronDown, FiEdit2 } from 'react-icons/fi';
import { logout } from '../redux/slice/loginSlice';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
const MyInfo = () => {
  const APIURL = useSelector((state: RootState) => state.api.APIURL);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.user.username); // username 상태 가져오기
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const refreshToken = useSelector((state: RootState) => state.user.refreshToken);
  const email = useSelector((state: RootState) => state.user.email);

  const profileImg = useSelector((state: RootState) => state.user.profileImg);
  const [isModalOpen, setModalOpen] = useState(false);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

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
  const BadgeComponent = badge.map(a => {
    return (
      <UserBadgeContainer>
        <UserBadge>{a}</UserBadge>
        {/* 어떻게 불러올 것인지 고민하기  -> grid 찾아보기 */}
      </UserBadgeContainer>
    );
  });

  //계정 삭제 기능
  const deleteHandler = () => {
    axios
      .delete(`${APIURL}/members/my-info`, {
        headers: {
          Authorization: accessToken,
          'Refresh-Token': refreshToken,
        },
      })
      .then(response => {
        //헤더에 accesstoken, refreshtoken 담기
        if (response.status === 204) {
          alert('계정이 삭제되었습니다.');
          dispatch(logout());
          navigate('/');
        }
      })
      .catch(error => {
        console.error('서버 연결 불가:', error);
        alert('서버 연결이 되어있지 않습니다.');
      });
  };

  interface DeleteAccountModalProps {
    onClose: () => void;
  }

  const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ onClose }) => {
    return (
      <div
        style={{
          position: 'fixed',
          zIndex: 1001,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '400px',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
          }}>
          <h3>회원 탈퇴</h3>
          <p style={{ margin: '10px', fontSize: '12px' }}>현재 계정을 영구적으로 삭제하시겠습니까?</p>
          <div style={{ display: 'flex' }}>
            <PasswordButton
              onClick={onClose}
              style={{ width: '100px', height: '40px', fontSize: '12px', backgroundColor: '#7791BB', color: 'white' }}>
              취소
            </PasswordButton>
            <PasswordButton
              style={{ width: '100px', height: '40px', fontSize: '12px', backgroundColor: '#5A5A5A', color: 'white' }}
              onClick={deleteHandler}>
              확인
            </PasswordButton>
          </div>
        </div>
      </div>
    );
  };

  //비밀번호변경 모달
  const PasswordModalContent = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    //비밀번호 변경
    const changePassword = async () => {
      try {
        // 현재 비밀번호 확인
        const response = await axios.patch(
          `${APIURL}/members/password`,
          { currentPassword: currentPassword, newPassword: newPassword },
          {
            headers: {
              Authorization: accessToken,
              'Refresh-Token': refreshToken,
            },
          },
        );

        console.log(currentPassword, newPassword);

        if (response.status === 200) {
          alert('비밀번호가 성공적으로 변경되었습니다.');
        }
      } catch (error) {
        console.log(error);
      }
    };

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });

    return (
      <ModalContentContainer>
        <h2>비밀번호 변경</h2>

        <div>
          <PasswordTitle>
            <label htmlFor="current-password">현재 비밀번호</label>
          </PasswordTitle>
          <PasswordInput
            type="password"
            id="current-password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호 입력"
          />
        </div>

        <div>
          <PasswordTitle>
            <label htmlFor="new-password">새로운 비밀번호</label>
          </PasswordTitle>
          <PasswordInput
            type="password"
            id="new-password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="새로운 비밀번호 입력"
          />
        </div>

        <div>
          <PasswordTitle>
            <label htmlFor="confirm-new-password">새로운 비밀번호 확인</label>
          </PasswordTitle>
          <PasswordInput
            type="password"
            id="confirm-new-password"
            value={confirmNewPassword}
            onChange={e => setConfirmNewPassword(e.target.value)}
            placeholder="새로운 비밀번호 재입력"
          />
        </div>

        <PasswordContainer>
          {/* authtype google이면 안 보이게 */}
          <PasswordButton
            className="buttontop"
            onClick={changePassword}
            style={{ backgroundColor: '#7791BB', color: '#ffffff' }}>
            비밀번호 변경하기
          </PasswordButton>

          <PasswordButton
            onClick={() => {
              setModalOpen(false);
              setCurrentPassword('');
              setNewPassword('');
              setConfirmNewPassword('');
            }}
            style={{ backgroundColor: '#5A5A5A', color: '#ffffff' }}>
            닫기
          </PasswordButton>
        </PasswordContainer>
      </ModalContentContainer>
    );
  };

  // const [selectedImage, setSelectedImage] = useState(null);
  // console.log(selectedImage);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          // setSelectedImage(reader.result);
          dispatch(setProfileImg(reader.result));
          uploadImage(file); //서버에 이미지 전송
          console.log(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  //이미지 업로드
  const uploadImage = async (file: any) => {
    const formData = new FormData();
    formData.append('imageFile', file);

    axios
      .post(`${APIURL}/posts/uploadImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: accessToken,
          'Refresh-Token': refreshToken,
        },
      })
      .then(response => {
        if (response.status === 200) {
          setProfileImg(response.data.imageUrl + '?' + new Date().getTime());
          console.log(response);
          axios
            .patch(`${APIURL}/members/profile-image`, formData, {
              headers: {
                Authorization: accessToken,
                'refresh-token': refreshToken,
              },
              params: {
                img: response.data, // 쿼리 파라미터로 dataurl 추가
              },
            })
            .then(response => {
              if (response.status === 200) {
                alert('프로필 사진이 변경되었습니다.');
                localStorage.setItem('profileImg', response.data.imageUrl);
                setProfileImg(response.data.imageUrl); //user정보 전체 response로 올 것
                console.log(response);
              }
            });
        }
      })
      .catch(error => {
        console.log(error, '서버에 이미지 전송을 실패하였습니다.');
      });
  };

  const [isEditing, setIsEditing] = useState(false); // username을 수정하는 중인지 상태
  const [tempUsername, setTempUsername] = useState(username); // 임시 username 저장
  const [byte, setByte] = useState(getByteLength(username));

  //20byte 길이 검사하는 함수 - 한글은 3byte, 영문 및 숫자는 1byte
  function getByteLength(str: any) {
    return str.split('').reduce((byteLength: any, char: any) => {
      const charCode = char.charCodeAt(0);
      if (charCode <= 0x7f) {
        return byteLength + 1;
      } else if (charCode <= 0x7ff) {
        return byteLength + 2;
      } else if (0xd800 <= charCode && charCode <= 0xdbff) {
        // Surrogate pair: These take 4 bytes in UTF-8 and 2 chars in UCS-2
        // (Assume next char is the other [valid] half and just skip it)
        return byteLength + 4;
      } else {
        // Other characters are 3 bytes in UTF-8
        return byteLength + 3;
      }
    }, 0);
  }

  // 정규식을 사용하여 허용된 문자 및 기호만 입력되게 하는 로직
  const isValidInput = (input: any) => {
    const pattern = /^[A-Za-z0-9_.가-힣]*$/;
    return pattern.test(input);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    const inputByte = getByteLength(inputValue);

    if (getByteLength(inputValue) <= 20 && isValidInput(inputValue)) {
      setTempUsername(inputValue);
      setByte(inputByte);
    }
  };

  const handleInputBlur = async () => {
    // 사용자가 input 바깥을 클릭했을 때 변경을 적용할 경우 아래 코드 추가
    await updateUsername();
    setIsEditing(false);
    setUsername(tempUsername);
  };

  const handleInputKeyUp = async (e: any) => {
    if (e.key === 'Enter') {
      await updateUsername();
      setIsEditing(false);
      setUsername(tempUsername);
    }
  };

  //닉네임 변경
  const updateUsername = async () => {
    // tempUsername이 빈 문자열이면 업데이트를 건너뛴다.
    if (!tempUsername.trim()) {
      setTempUsername(username); // 현재 username으로 tempUsername을 리셋한다.
      return;
    }

    // dispatch
    dispatch(setUsername(tempUsername));

    // 서버 업데이트
    try {
      const response = await axios.patch(`${APIURL}/members/username`, {
        headers: {
          Authorization: accessToken,
          'Refresh-Token': refreshToken,
        },
        params: {
          username: username, // 쿼리 파라미터로 username 추가
        },
      });

      console.log(username);

      if (response.status === 200) {
        console.log(response.data);
        dispatch(setUsername(response.data['username']));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <MyInfoContainer>
        <ProfileContainer>
          <MenuContainer>
            <FiChevronDown
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              style={{ display: 'flex', cursor: 'pointer', color: '#b4b4b4' }}
            />
            {isDropdownOpen && (
              <DropdownMenu>
                <p
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setDeleteModalOpen(true);
                    setDropdownOpen(false);
                  }}>
                  회원 탈퇴
                </p>
              </DropdownMenu>
            )}
          </MenuContainer>
          <ProfileContent>
            <ProfileImg src={profileImg} onClick={handleProfileClick} style={{ cursor: 'pointer' }} />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <div>
              <Username>
                {isEditing ? (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <input
                        style={{ fontSize: '16px', fontWeight: '700', textAlign: 'center', padding: 0, margin: 0 }}
                        value={tempUsername}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur} // (옵션) input 바깥을 클릭했을 때 변경 적용
                        onKeyUp={handleInputKeyUp}
                        autoFocus // input이 활성화될 때 자동으로 포커스
                      />

                      <span style={{ fontSize: '12px', fontWeight: '500', textAlign: 'center' }}>
                        {byte}byte / 20byte
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {username}
                    <FiEdit2
                      onClick={handleEditClick}
                      style={{ paddingTop: '5px', color: '#a1a1a1', cursor: 'pointer' }}
                    />
                  </>
                )}
              </Username>
            </div>
            <BottomContainer>
              <Email>{email}</Email>
              <PasswordReset
                onClick={() => {
                  setModalOpen(true);
                }}>
                비밀번호 변경
              </PasswordReset>
            </BottomContainer>
          </ProfileContent>
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>{BadgeComponent}</div>
          </BadgeContainer>
        </StampBadgeContainer>
      </MyInfoContainer>

      {isModalOpen && (
        <PasswordModalBackground>
          <PasswordModalContent />
        </PasswordModalBackground>
      )}

      {isDeleteModalOpen && <DeleteAccountModal onClose={() => setDeleteModalOpen(false)} />}
    </div>
  );
};

export default MyInfo;

const ModalContentContainer = styled.div`
  position: fixed;
  z-index: 2000;
  background-color: #ffffff; // Setting background color to white
  border-radius: 20px; // Optional: if you want rounded corners
  padding: 30px; // Optional: if you want some space inside the modal
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); // Optional: for a slight shadow around the modal
  width: 80%; // Optional: if you want to define a width, else it will adapt to its content
  max-width: 500px; // Optional: to limit the maximum width
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const PasswordTitle = styled.div`
  font-size: 16px;
  margin-top: 15px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 350px;
  left: 385px;
  font-size: 12px;
  background-color: white;
  border: 0.8px solid #a5a5a5;
  border-radius: 7px;
  padding: 10px;
  /* box-shadow: 2px 2px 50px 0.5px #b4b4b4 */
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const PasswordButton = styled.button`
  font-size: 16px;
  border-radius: 50px;
  border: #c0c0c0 0.5px solid;
  padding: 10px;
  margin: 5px;
  height: 46px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #c2c2c2;
  }

  &.buttontop {
    margin-top: 10px;
  }
`;

const PasswordInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  font-size: 16px;
  margin: 10px 0;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #0077ff;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px;
`;

const PasswordModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경 추가
`;

const MyInfoContainer = styled.div`
  display: flex;
  gap: 77px;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileContainer = styled.div`
  border-radius: 21px;
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  min-width: 366px;
  height: 385px;
  margin-left: 100px;
  margin-top: 193px;
`;

const ProfileImg = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 100px;
  border: 2px #ececec solid;
`;

const Username = styled.div`
  color: #000;
  padding-left: 10px;
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
  margin-top: 10px;
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
  margin-top: 20px;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  position: absolute;
  margin: 215px;
  display: flex;
  flex-direction: column;
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
