import styled from "styled-components";
import logo from "../assets/Logo.png"
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import Modal from "../components/atoms/Modal";
import { useDispatch } from "react-redux";
import { openModal, setModalContent } from "../redux/slice/modalSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";


function LoginPage () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);

    const linkToSignupHandler = () => {
        navigate("/signup");
    }

    const modalOpenHandler = () => {
        dispatch(openModal());
        dispatch(setModalContent("비밀번호를 잊으셨나요? 가입하신 이메일을 적어주세요. 이메일로 비밀번호 재설정 링크를 보내드리겠습니다."));
    }

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
                                type="email" />
                            <Input
                                className="password-input"
                                placeholder="비밀번호"
                                type="password" />
                            <div className="forgot-pw"
                                onClick={modalOpenHandler}>비밀번호 찾기</div>
                            <PwModal>
                                <div className="modal-cont-wrapper">
                                    <div className="modal-title">비밀번호 찾기</div>
                                    <p className="modal-content">{isModalOpen ? "비밀번호를 잊으셨나요? 가입하신 이메일을 적어주세요. 이메일로 비밀번호 재설정 링크를 보내드리겠습니다." : ""}</p>
                                    <div>
                                        <Input className="modal-email-input"
                                        placeholder="이메일"
                                            type="email" />
                                    </div>
                                    <div>
                                        <SubmitButton
                                        className="modal-email-submit">이메일 전송하기</SubmitButton>
                                    </div>
                                </div>
                            </PwModal>
                            <ButtonWrapper>
                                <SubmitButton
                                    className="login-submit">Log in</SubmitButton>
                                <SubmitButton
                                    className="google-login-submit">Log in with Google</SubmitButton>
                            </ButtonWrapper>
                        </LoginForm>
                    </FormContainer>
                    <IsUser onClick={linkToSignupHandler}>계정이 없으신가요?</IsUser>
            </EleWrapper>
        </LoginContainer>
     </Container>
    )
}

export default LoginPage;

const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100vh;

    @media (max-width: 1152px) {
        // 화면 크기가 1056px 이하일 때
        transform: scale(0.9);
    }

    @media (max-width: 768px) {
        // 화면 크기가 768px 이하일 때
        transform: scale(0.9);
    }

    @media (max-width: 480px) {
        // 화면 크기가 480px 이하일 때
        transform: scale(0.9);
    }
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
        background-color: #7092BF;
        color: #fff;
        border: none;

        &:hover {
            background-color: #D4E2F1;
        }
    }

    &.google-login-submit {
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
`;

const IsUser = styled.div`
    color: #000;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
`;