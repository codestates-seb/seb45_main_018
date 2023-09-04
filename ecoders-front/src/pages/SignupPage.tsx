import styled from "styled-components";
import logo from "../assets/Logo.png"
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import Modal from "../components/atoms/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../redux/slice/modalSlice";
import React, { useState } from "react";
import { registerUser } from "../redux/slice/authSlice";

interface SignUpProps {
    username?: string;
    email?: string;
    password?: string;
}

function SignupPage (props: SignUpProps) {
    const [ formData, setFormData ] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const linkToLoginPageHandler = () => {
        navigate("/login");
        dispatch(closeModal());
    };

    const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(formData)
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        /* dispatch(registerUser(formData)); // 오류가 나는 부분 */
        dispatch(openModal());
    };

    return (
     <Container>
        <SignupContainer>
            <EleWrapper>
                    <Logo src={logo} />
                    <Title>SIGN UP</Title>
                    <div className="sign-up-text">구글 간편 로그인으로 회원가입 및 로그인이 가능합니다.</div>
                    <FormContainer>
                        <SignUpForm onSubmit={onSubmitHandler}>
                            <Input
                                className="email-input"
                                placeholder="이메일"
                                type="email"
                                value={formData.email}
                                onChange={valueHandler} />
                            <Input
                                className="password-input"
                                placeholder="비밀번호"
                                type="password"
                                value={formData.password}
                                onChange={valueHandler}/>
                            <Input
                                className="password-check-input"
                                placeholder="비밀번호 확인"
                                type="password" />
                            <Input
                                className="username-input"
                                placeholder="닉네임"
                                type="text"
                                value={formData.username}
                                onChange={valueHandler}
                                />
                            <ButtonWrapper>
                                <SubmitButton
                                    className="sign-up-submit">Sign up</SubmitButton>
                                    <SignUpModal>
                                        <div className="modal-cont-wrapper">
                                            <p className="modal-content">회원가입 인증 메일이 전송되었습니다. 메일함을 확인해주세요.</p>
                                            <div>
                                                <SubmitButton
                                                className="link-to-login"
                                                onClick={linkToLoginPageHandler}>로그인 하러가기</SubmitButton>
                                            </div>
                                        </div>
                                    </SignUpModal>
                                <SubmitButton
                                    className="google-sign-up-submit">Sign up with Google</SubmitButton>
                            </ButtonWrapper>
                        </SignUpForm>
                    </FormContainer>
                    <IsUser onClick={linkToLoginPageHandler}>계정이 이미 있으신가요?</IsUser>
            </EleWrapper>
        </SignupContainer>
     </Container>
    )
}

export default SignupPage;

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