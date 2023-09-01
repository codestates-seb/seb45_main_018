import styled from "styled-components";
import CommonInput from "../components/atoms/CommonInput";
import CommonButton from "../components/atoms/CommonButton";
import CommonModal from "../components/atoms/CommonModal";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/slice/modalSlice";


function LoginPage () {
    const dispatch = useDispatch();

    const modalOpenHandler = () => {
        dispatch(openModal());
    }

    const sendEmailHander = () => {
    }

    return (
        <Container>
            <LoginContainer>
                <TitleWrapper>
                    <LogoBox>
                        <img src="https://media.discordapp.net/attachments/1144091288887623703/1145973724718317629/24x.png?width=1014&height=750" />
                    </LogoBox>
                    <Title>LOGIN</Title>
                </TitleWrapper>
                <LoginFormWrapper>
                    <LoginForm>
                        <LoginInputWrapper>
                            <LoginInputBox>
                                <CommonInput
                                    placeholder="이메일"
                                    type="email"
                                    className="sign-in-email"
                                    padding="8px 0px" />
                            </LoginInputBox>
                            <LoginInputBox>
                                <CommonInput
                                    placeholder="비밀번호"
                                    type="password"
                                    className="sign-in-password"
                                    padding="8px 0px" />
                            </LoginInputBox>
                        </LoginInputWrapper>
                        <ForgotPasswordbox>
                            <div className="forgot-pw" onClick={modalOpenHandler}>비밀번호 찾기</div>
                            <CommonModal>
                                <div className="modal-title">비밀번호 찾기</div>
                                <p>비밀번호를 잊으셨나요? 가입하신 이메일을 적어주시면, 비밀번호 재설정 링크를 보내드리겠습니다.</p>
                                <CommonInput
                                    className="modal-email"
                                    placeholder="이메일" />
                                <CommonButton className="send-email-button"
                                    bgColor="#7092BF"
                                    border="none"
                                    color="#fff"
                                    hoverBgColor="#D4FFC0"
                                    hoverColor="#000"
                                    onClick={sendEmailHander}>이메일 전송하기</CommonButton>
                            </CommonModal>
                        </ForgotPasswordbox>
                        <LoginBtnWrapper>
                            <LoginBtnBox>
                                <CommonButton className="sign-in-button"
                                    bgColor="#7092BF"
                                    border="none"
                                    color="#fff"
                                    hoverBgColor="#D4FFC0"
                                    hoverColor="#000"
                                    >Log in</CommonButton>
                            </LoginBtnBox>
                            <LoginBtnBox>
                                <CommonButton className="google-sign-in-button"
                                    border="none"
                                    bgColor="#D9D9D9"
                                    hoverBgColor="#D4FFC0"
                                    hoverColor="#000">Log in with Google</CommonButton>
                            </LoginBtnBox>
                        </LoginBtnWrapper>
                        <SignUpTextBox>
                            <div>계정이 없으신가요?</div>
                        </SignUpTextBox>
                    </LoginForm>
                </LoginFormWrapper>
            </LoginContainer>
        </Container>
    )
}

export default LoginPage;

const Container = styled.section`
    display: flex;
    flex-direction: column;
`;

const LoginContainer = styled.div`
    border: 3px solid #000;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    width: 25rem;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const LogoBox = styled.div`
    padding-top: 60px;

    > img {
        width: 115px;
    }
`;

const Title = styled.div`
    font-size: 36px;
    font-weight: 600;
    text-align: center;
    line-height: normal;
`;

const LoginFormWrapper = styled.div`
    padding: 40px 80px;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const LoginInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const LoginInputBox = styled.div`

    &:nth-child(1) {
        padding-bottom: 20px;
    }
`;

const ForgotPasswordbox = styled.div`
    padding: 10px 0px;
    cursor: pointer;
    font-size: 14px;

    .forgot-pw {
        text-align: end;
    }

    &:nth-child(2) {

        .modal-title {
            font-size: 20px;
            margin: 10px;
            font-weight: 600;
        }

        .modal-email {
            margin-bottom: 20px;
            padding-right: 0px;
        }

    }
`;

const LoginBtnWrapper = styled.div`
    padding: 10px 0px;
`;

const LoginBtnBox = styled.div`

    &:nth-child(1) {
        padding-bottom: 10px;
    }

    .sign-in-button {
        padding: 12px;
    }

    .google-sign-in-button {
        padding: 12px;
    }
`;

const SignUpTextBox = styled.div`
    font-size: 14px;
    color: #000;

    > div {
        cursor: pointer;
    }
`;