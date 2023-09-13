import { GoogleLogin } from 'react-google-login';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import Button from '../components/atoms/Button';
import styled from 'styled-components';
import googleicon from '../assets/google-icon.png';


interface GLoginProps {
    children: React.ReactNode;
    onClick: (e:React.MouseEventHandler<HTMLButtonElement>) => Promise<void>; 
}

const GLogin: React.FC<GLoginProps> = () => {

    const clientId = useSelector((state: RootState) => state.login.clientId);
    const onSuccess = (res:any) => {
        console.log("로그인 성공! 현재 유저: ", res.profileObj);
       
    }

    const onFailure = (res: any) => {
        console.log("로그인 실패! res: ", res)
    }

    return (
        <div>
            <GoogleLogin 
            clientId={clientId}
            onSuccess={onSuccess}
            onFailure={onFailure}
            render={(renderProps) => (
                <div>
            <SubmitButton onClick={renderProps.onClick} className="google-login-submit"> 
            <GoogleLogo src={googleicon} />
            Log in with google</SubmitButton>
            </div>)}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            />
        </div>
    )
}

export default GLogin


const SubmitButton = styled(Button)`
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