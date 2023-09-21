import styled from "styled-components";
import logo from "../assets/Logo.png"
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import Modal from "../components/atoms/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../redux/slice/modalSlice";
import { useState, useEffect } from "react";
import { registerFail, registerStart, registerSuccess } from "../redux/slice/authSlice";
import { setUsername, setAccessToken, setAuthType, setRefreshToken, setEmail, setId } from '../redux/slice/userSlice';
import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import googleicon from '../assets/google-icon.png';
import { RootState } from "../redux/store/store";
import { gapi } from 'gapi-script';
import { login } from '../redux/slice/loginSlice';


interface ErrorObject {
    email: string | null | undefined;
    password: string | null | undefined;
    confirmPassword: string | null | undefined;
    username: string | null | undefined;
}

function Signup () {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clientId = useSelector((state: RootState) => state.login.clientId);
    const APIURL = useSelector((state: RootState) => state.api.APIURL);

    useEffect(() => {
        function initGoogleAuth() {
          gapi.auth2.init({
            clientId: clientId,
            prompt: 'select_account'
        });
            gapi.client.init({
                clientId: clientId,
                scope: 'email name' // 필요한 스코프를 여기에 추가하세요.
            }).then(() => {
                // 클라이언트 라이브러리가 초기화된 후의 로직
                const authInstance = gapi.auth2.getAuthInstance();
                if (authInstance.isSignedIn.get()) {
                    dispatch(login());
                }
            });
        }

        // gapi 라이브러리를 로드하고, 로드가 완료되면 initGoogleAuth 함수를 호출합니다.
        gapi.load("client:auth2", initGoogleAuth);
    }, []);  // 의존성 배열에 clientId와 dispatch를 추가했습니다.

    const onSuccess = async (res: any) => {
        const email = res.profileObj.email;
        dispatch(setEmail(email));
        const username = res.profileObj.name;
        console.log(email);
        dispatch(setUsername(username));
        try {
          const response = await axios.post(`${APIURL}/auth/oauth/google/login`, {
            email: email,
            username: username,
          });

          if (response.status === 200) {
            const headers = response.headers;
            const accessToken = headers['authorization'];
            const refreshToken = headers['refresh-token'];
            const id = headers['member-id'];

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('id', id);

            dispatch(setAccessToken(accessToken));
            dispatch(setRefreshToken(refreshToken));
            dispatch(setId(id));
            dispatch(setAuthType('GOOGLE'));
            console.log(accessToken);
            console.log(refreshToken);

            console.log(id);
            console.log('로그인 성공! 현재 유저: ', res.profileObj);
            dispatch(login());
            navigate('/');
          }
        } catch (error) {
          console.error('Error occurred:', error);
          alert('오류');
        }
      };

      const onFailure = (res: any) => {
        console.log('로그인 실패! res: ', res);
      };

    // input 상태
    const [ formData, setFormData ] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
    });

    // 유효성 검사용 input 상태
    const [errors, setErrors] = useState<ErrorObject>({
        email: null,
        password: null,
        confirmPassword: null,
        username: null,
    });

    // 유효성 검사 함수
    const validateForm = (): boolean => {
        const newErrors: ErrorObject = {
            email: null,
            password: null,
            confirmPassword: null,
            username: null,
          };

        // input에 값을 입력하지 않았을 경우
        if (!formData.email) {
            newErrors.email = '이메일을 입력하세요.';
        }
        if (!formData.password) {
            newErrors.password = '비밀번호를 입력하세요.';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호를 다시 한 번 입력하세요.';
        }
        if (!formData.username) {
            newErrors.username = '닉네임을 입력하세요.';
        }

        // 이메일이 형식에 맞지 않을 때
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (formData.email && !emailRegex.test(formData.email)) {
            newErrors.email = '올바른 이메일 형식이 아닙니다.';
        }

        // 닉네임이 형식에 맞지 않을 때
        const usernameRegex = /^(?!.*\s)(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{4,20}$/;
        if (formData.username) {
            newErrors.username = !formData.username
                ? '닉네임을 입력하세요.'
                : !usernameRegex.test(formData.username)
                ? '닉네임 형식이 맞지 않습니다.'
                : formData.username.length < 4
                ? '닉네임은 4자 이상이어야 합니다.'
                : formData.username.length > 20
                ? '닉네임은 20자 이하로 설정하세요.'
                : undefined;
        }

        // 비밀번호가 형식에 맞지 않을 때
        const passwordRegex = /^(?![0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+`])[A-Za-z0-9!@#$%^&*()_+`]{8,20}$/;

        if (formData.password) {
            newErrors.password = !passwordRegex.test(formData.password)
                ? /^[0-9]/.test(formData.password)
                    ? '비밀번호는 숫자로 시작할 수 없습니다.'
                    : formData.password.length < 8
                    ? '비밀번호는 8자 이상이어야 합니다.'
                    : undefined
                : undefined;
        }

        // 비밀번호가 일치하지 않을 때
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        }

        setErrors(newErrors);

        // 오류가 없다면
        return Object.values(newErrors).every((error) =>!error);
    }

    // onChange
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

    };

    // 로그인 페이지로 이동
    const linkToLoginPageHandler = () => {
        navigate("/login");
        dispatch(closeModal("")); // 모달이 열려 있지 않게 함
    };

    // submit 함수
    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerStart());

        // 유효성 검사
        const isValid = validateForm();
        if(!isValid) {
            return;
        }

        try {
            const newformData = {
                ...formData,
                confirmPassword: '',
            };

            const response = await axios.post(`${APIURL}/auth/signup`, newformData, {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            );

            // 이미 존재하는 이매일 일때
            if (response.status === 403) {
                errors.email = '이미 존재하는 이메일입니다.';
                setErrors(errors);
            }

            console.log(response.data);
            dispatch(registerSuccess(response.data.user));
            dispatch(openModal("sendingMailModal"));
        } catch (err: any) {
            dispatch(registerFail(err.response.data.error));
        }
    };

    return (
     <Container>
        <SignupContainer>
            <EleWrapper>
                    <Logo src={logo} />
                    <Title>SIGN UP</Title>
                    <div className="sign-up-text">구글 간편 로그인으로 회원가입 및 로그인이 가능합니다.</div>
                    <FormContainer>
                        <SignUpForm onSubmit={onSubmitHandler} noValidate>
                            <Input
                                className="email-input"
                                placeholder="이메일"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={changeHandler}
                                />
                                {errors.email && <ErrorText>{errors.email}</ErrorText>}
                            <Input
                                className="password-input"
                                placeholder="비밀번호"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={changeHandler}
                                />
                                {errors.password ? (<ErrorText>{errors.password}</ErrorText>) : (<Info>비밀번호는 영문/숫자/특수문자를 반드시 포함한 8자 이상이어야 합니다.</Info>)}
                            <Input
                                className="password-check-input"
                                placeholder="비밀번호 확인"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={changeHandler}
                                />
                                {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
                            <Input
                                className="username-input"
                                placeholder="닉네임"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={changeHandler}
                                />
                                {errors.username ? (<ErrorText>{errors.username}</ErrorText>) : (<Info>닉네임은 한글/영문/숫자 포함 4자 이상 20자 이하여야 합니다.</Info>)}
                            <ButtonWrapper>
                                <SubmitButton
                                    className="sign-up-submit">Sign up</SubmitButton>
                                    <SignUpModal modaltype="sendingMailModal">
                                        <div className="modal-cont-wrapper">
                                            <p className="modal-content">회원가입에 성공하였습니다.</p>
                                            <div>
                                                <SubmitButton
                                                className="link-to-login"
                                                onClick={linkToLoginPageHandler}>로그인 하러가기</SubmitButton>
                                            </div>
                                        </div>
                                    </SignUpModal>
                                    <GoogleLogin
                                        clientId={clientId}
                                        onSuccess={onSuccess}
                                        onFailure={onFailure}
                                        render={renderProps => (
                                            <div>
                                            <SubmitButtonGoogle onClick={renderProps.onClick} className="google-login-submit">
                                                <GoogleLogo src={googleicon} />
                                                Sign up with google
                                            </SubmitButtonGoogle>
                                            </div>
                                        )}
                                        cookiePolicy={'single_host_origin'}
                                        isSignedIn={true}>
                                        Sign up with Google
                                        </GoogleLogin>
                            </ButtonWrapper>
                        </SignUpForm>
                    </FormContainer>
                    <IsUser onClick={linkToLoginPageHandler}>계정이 이미 있으신가요?</IsUser>
            </EleWrapper>
        </SignupContainer>
     </Container>
    )
}

export default Signup;

const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100vh;
`;

const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 3px solid #000;
    border-radius: 30px;
    background-color: #fff;
    width: 32rem;
    padding: 5rem;

    @media (max-width: 1152px) {
    // 화면 크기가 1152px 이하일 때
        width: 32rem;
        padding: 5rem;
    }

    @media (max-width: 768px) {
        // 화면 크기가 768px 이하일 때
        width: 32rem;
        padding: 5rem;
    }

    @media (max-width: 480px) {
        // 화면 크기가 480px 이하일 때
        width: 24rem;
        padding: 3rem;
    }
`;

const EleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .sign-up-text {
        text-align: center;
        width: 60%;
    }
`;

const Logo = styled.img`
    width: 115px;

    @media (max-width: 1152px) {
    // 화면 크기가 1152px 이하일 때
        width: 115px;
    }

    @media (max-width: 768px) {
        // 화면 크기가 768px 이하일 때
        width: 115px;
    }

    @media (max-width: 480px) {
        // 화면 크기가 480px 이하일 때
        width: 78px;
    }
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

const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 18rem;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 1rem;
`;

const SignUpModal = styled(Modal)`
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

const SubmitButton = styled(Button)`
    padding: 16px;

    &.sign-up-submit {
        background-color: #7092BF;
        color: #fff;
        border: none;

        &:hover {
            background-color: #D4E2F1;
        }
    }

    &.google-sign-up-submit {
        background-color: #fff;
        border: 1px solid #5A5A5A;

        &:hover {
            background-color: #5A5A5A;
            border: 1px solid #5A5A5A;
        }
    }

    &.modal-email-submit {
        background-color: #7092BF;
        color: #fff;
        border: none;

        &:hover {
            background-color: #D4E2F1;
        }
    }

    &.link-to-login {
        background-color: #7092BF;
        color: #fff;
        border: none;

        &:hover {
            background-color: #D4E2F1;
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

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  text-align: left;
`;

const SubmitButtonGoogle = styled(Button)`
  display: flex;
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

const Info = styled.p`
    font-size: 12px;
    color:#D4D4D4;
    padding-left: 5px;
`;