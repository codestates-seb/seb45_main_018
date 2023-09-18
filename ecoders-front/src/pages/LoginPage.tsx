import { GoogleLogin } from 'react-google-login';
import googleicon from '../assets/google-icon.png';

import { login } from '../redux/slice/loginSlice';
import axios from 'axios';
import styled from 'styled-components';
import logo from '../assets/Logo.png';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Modal from '../components/atoms/Modal';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/slice/modalSlice';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, setRefreshToken } from '../redux/slice/userSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { setId } from '../redux/slice/userSlice';
// import GLogin from './GLogin';
import { RootState } from '../redux/store/store';
// import { gapi } from 'gapi-script';
// import { useEffect } from 'react';


// 1. 추가할 것: 이메일 형식이 올바르지 않으면 오류 메시지 띄우기(유효성 검사)
// 2. 공란이면 입력해달라고하기.

function LoginPage() {

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const APIURL = useSelector((state:RootState) => state.api.APIURL);

    const onSuccess = async (res: any) => {
      try {
          const { email, name } = res.profileObj;
          const response = await axios.post(`${APIURL}/oauth/google/login`, {
              email,
              username: name,
          });
  
          if (response.status === 200) {
              const headers = response.headers;
              const accessToken = headers['authorization'];
              const refreshToken = headers['refresh-token'];
              const id = headers['id'];
  
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);
              localStorage.setItem('id', id);
  
              dispatch(setAccessToken(accessToken));
              dispatch(setRefreshToken(refreshToken));
              dispatch(setId(id));
  
              console.log("로그인 성공! 현재 유저: ", res.profileObj);
              dispatch(login()); 
              navigate('/');
          }
      } catch (error) {
          console.error("Error occurred:", error);
          alert('오류');
      }
  }
  

    // const onSuccess = (res: any) => {
    //   console.log(res.profileObj)
    // }

    const onFailure = (res: any) => {
        console.log("로그인 실패! res: ", res)
    }


  const APIURL = useSelector((state:RootState) => state.api.APIURL);
  const clientId = useSelector((state: RootState) => state.login.clientId);

  const [email, setEmail] = useState(''); // 이메일 상태와 업데이트 함수를 선언합니다.
  const [password, setPassword] = useState(''); // 비밀번호 상태와 업데이트 함수를 선언합니다.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkToSignupHandler = () => {
    navigate('/signup');
  };

  const modalOpenHandler = () => {
    dispatch(openModal('findPwModal'));
  };

// useEffect(() => {
//     function initGoogleAuth() {
//         gapi.client.init({
//             clientId: clientId,
//             scope: 'email name' // 필요한 스코프를 여기에 추가하세요.
//         }).then(() => {
//             // 클라이언트 라이브러리가 초기화된 후의 로직
//             const authInstance = gapi.auth2.getAuthInstance();
//             if (authInstance.isSignedIn.get()) {
//                 dispatch(login());
                
//                 // 선택적으로 사용자 정보를 콘솔에 출력하는 코드
//                 // var profile = authInstance.currentUser.get().getBasicProfile();
//                 // console.log('Email: ' + profile.getEmail());
//                 // console.log('Full Name: ' + profile.getName());
//             }
//         });
//     }

//     // gapi 라이브러리를 로드하고, 로드가 완료되면 initGoogleAuth 함수를 호출합니다.
//     gapi.load("client:auth2", initGoogleAuth);
// }, [clientId, dispatch]);  // 의존성 배열에 clientId와 dispatch를 추가했습니다.

// const googleHandler = () => {
//   try {
//     if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
//         // 사용자가 로그인되지 않은 경우 로그인 프로세스 시작
//         gapi.auth2.getAuthInstance().signIn().then(() => {
//             const googleAccessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
//             console.log(googleAccessToken);
//             // 추가 로직
//         });
//     } else {
//         const googleAccessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
//         console.log(googleAccessToken);
//         // 추가 로직
//     }
// } catch (error) {
//     console.error(error);
//     alert('오류가 발생했습니다.');
// }
// }

//   async function googleHandler() {

    // try{
    //     useEffect(()=> {
    //         function start() {
    //           gapi.client.init({
    //             clientId: clientId,
    //             scope: ""
    //           })
    //         }
    //         gapi.load("client:auth2", start)
    //       })
        
    //       const googleAccessToken = gapi.auth.getToken().access_token;
    //       console.log(googleAccessToken)
    //       // localStorage.setItem('accessToken', accessToken);
    // }
    // catch {
    //     alert('오류가 발생했습니다.')
    // }
// }

  const loginHandler = async (e: any) => {
    e.preventDefault();

    // const emailToSend = email || 'abc@gmail.com'; // 이메일 상태 값을 사용합니다.
    // const pwdToSend = password || '123456'; // 비밀번호 상태 값을 사용합니다.

    try {
      const response = await axios.post(`${APIURL}/auth/login`, {
        email: email,
        password: password,
      });

      console.log(email);
      console.log(password);

      if (response.status === 200) {
        // const { accessToken, refreshToken } = response.data;
        // (수정사항) 1. 다시 user 정보 get 새로..
        // (수정사항) 2. 유저정보조회 시: id로 검색
        const authHeader = response.headers['authorization'];
        const refreshHeader = response.headers['refresh-token'];
        // const idHeader = response.headers['member-id']
    
        let accessToken, refreshToken, id;
    
        // Authorization 헤더 값 할당
        if (authHeader) {
            accessToken = authHeader;
        }
    
        // Refresh-Token 헤더 값 할당
        if (refreshHeader) {
            refreshToken = refreshHeader;
        }

      //   if (idHeader) {
      //     id = idHeader;
      // } else {
      //   id = 'id를 불러오지 못하였습니다.';
      // }
    
        console.log(accessToken);  // 액세스 토큰 값
        console.log(refreshToken);  // 리프레시 토큰 값

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        // localStorage.setItem('id', id);

        console.log(accessToken); //추후 삭제
        console.log(refreshToken); //추후 삭제
        console.log(id); //추후 삭제

        dispatch(setAccessToken(accessToken));
        dispatch(setRefreshToken(refreshToken));
        // dispatch(setUsername(username));
        dispatch(setId(id));
        dispatch(login());

        navigate('/');
      } 
    } catch (error: any) {
      if(error.response.status === 401) {
        alert('로그인에 실패했습니다.')
      } else {
      alert('서버 오류가 발생했습니다.');
      console.error('로그인 에러:', error); }
    }
  };


  return (
    <Container>
      <LoginContainer>
        <EleWrapper>
          <Logo src={logo} />
          <Title>LOGIN</Title>
          <FormContainer>
            <LoginForm>
              <Input
                className="email-input"
                placeholder="이메일"
                type="email"
                value={email} // 이메일 상태 값을 할당합니다.
                onChange={e => setEmail(e.target.value)}
              />
              <Input
                className="password-input"
                placeholder="비밀번호"
                type="password"
                value={password} // 비밀번호 상태 값을 할당합니다.
                onChange={e => setPassword(e.target.value)} // 입력 변경시 상태를 업데이트합니다.
              />
              <div className="forgot-pw" onClick={modalOpenHandler}>
                비밀번호 찾기
              </div>
              <PwModal modaltype='findPwModal'>
                <div className="modal-cont-wrapper">
                  <div className="modal-title">비밀번호 찾기</div>
                  <p className="modal-content">
                    비밀번호를 잊으셨나요? 가입하신 이메일을 적어주세요. 이메일로 비밀번호 재설정 링크를
                    보내드리겠습니다.
                  </p>
                  <div>
                    <Input className="modal-email-input" placeholder="이메일" type="email" />
                  </div>
                  <div>
                    <SubmitButton className="modal-email-submit">이메일 전송하기</SubmitButton>
                  </div>
                </div>
              </PwModal>

              <ButtonWrapper>
                <SubmitButton className="login-submit" onClick={loginHandler}>
                  Log in
                </SubmitButton>
                {/* <SubmitButton className="google-login-submit"> */}
                  {/* <GLogin onClick={googleHandler}>Log in with Google</GLogin> */}


                  <GoogleLogin 
            clientId={clientId}
            onSuccess={onSuccess}
            onFailure={onFailure}
            render={(renderProps) => (
                <div>
            <SubmitButtonGoogle onClick={renderProps.onClick} className="google-login-submit"> 
            <GoogleLogo src={googleicon} />
            Log in with google</SubmitButtonGoogle>
            </div>)}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            >Log in with Google
            </GoogleLogin>


                  {/* </SubmitButton> */}
              </ButtonWrapper>
            </LoginForm>
          </FormContainer>
          <IsUser onClick={linkToSignupHandler}>계정이 없으신가요?</IsUser>
        </EleWrapper>
      </LoginContainer>
    </Container>
  );
}

export default LoginPage;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100vh;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #000;
  border-radius: 30px;
  background-color: #fff;
  width: 32rem;
  padding: 5rem;
`;

const EleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.img`
  width: 115px;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 36px;
  font-weight: 500;
  line-height: normal;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 18rem;

  .forgot-pw {
    text-align: end;
    color: #000;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
  }
`;

const PwModal = styled(Modal)`
  width: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  div > .modal-cont-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    > .modal-title {
      font-family: Inter;
      font-size: 24px;
      font-weight: 400;
      line-height: normal;
      text-align: center;
    }
  }

  p {
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    line-height: normal;
    text-align: left;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1rem;
`;

const SubmitButton = styled(Button)`
  padding: 16px;

  &.login-submit {
    background-color: #7092bf;
    color: #fff;
    border: none;

    &:hover {
      background-color: #d4e2f1;
    }
  }

  &.google-login-submit {
    background-color: #fff;
    border: 1px solid #5a5a5a;

    &:hover {
      background-color: #5a5a5a;
      border: 1px solid #5a5a5a;
    }
  }

  &.modal-email-submit {
    background-color: #7092bf;
    color: #fff;
    border: none;

    &:hover {
      background-color: #d4e2f1;
    }
  }
`;

const IsUser = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;





const SubmitButtonGoogle = styled(Button)`
display:flex;
justify-content: center;
align-items: center;
height: 50px;
padding: 16px;

  &.login-submit {
    background-color: #7092bf;
    color: #fff;
    border: none;

    &:hover {
      background-color: #d4e2f1;
    }
  }

  &.google-login-submit {
    background-color: #fff;
    border: 1px solid #5a5a5a;

    &:hover {
      background-color: #5a5a5a;
      border: 1px solid #5a5a5a;
    }
  }

  &.modal-email-submit {
    background-color: #7092bf;
    color: #fff;
    border: none;

    &:hover {
      background-color: #d4e2f1;
    }
  }
`;

const GoogleLogo = styled.img`
  width: 20px;
  height: auto;
  margin: 5px;
`;