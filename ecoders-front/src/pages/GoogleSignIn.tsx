
import { GoogleLogin } from 'react-google-login';
import { setEmail, setUsername } from '../redux/slice/userSlice';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slice/loginSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

const GoogleSignIn = () => {
  const APIURL = useSelector((state:RootState) => state.api.APIURL);
  const clientId = useSelector((state: RootState) => state.login.clientId);

    const dispatch = useDispatch();
  const responseGoogle = async (response: any) => {
    console.log(response);
    const email = response.profileObj.email;
    const username = response.profileObj.name;
    const accessToken = `Bearer ${response.tokenObj.access_token}`;
    dispatch(setUsername(username))
    dispatch(setEmail(email))
    console.log(username, email, accessToken)
    dispatch(login())
    // 여기서 필요한 정보 (예: 토큰)를 추출하고 서버에 전송하거나 다른 작업을 수행할 수 있습니다.

       // 서버에 POST 요청 보내기
       try {
        const result = await axios.post(`${APIURL}/auth/oauth/google/login`, {
            email,
            username
        }, {
            headers: {
                'Authorization': accessToken // 토큰을 헤더에 포함
            }
        });

        console.log(result.data); // 서버 응답 출력
    } catch (error) {
        console.error("서버에 데이터를 보내는 중 오류 발생:", error);
    }
  }

  return (
    <GoogleLogin
      clientId= {clientId}
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default GoogleSignIn;







