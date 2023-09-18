import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import './App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
  const [ data, setData ] = useState(null);
  const google = <FontAwesomeIcon icon={faGoogle} size="10x"/>;
  const oAuthURL = 
  `https://accounts.google.com/o/oauth2/v2/auth?client_id=클라이언트아이디&
response_type=token&
redirect_uri=https://localhost:5173&
scope=https://www.googleapis.com/auth/userinfo.email`
  const oAuthHandler = () => {
    window.location.assign(oAuthURL);
  }

  useEffect( async () => {
    const url = new URL(window.location.href);
    const hash = url.hash;
    if (hash) {
      const accessToken = hash.split("=")[1].split("&")[0];
      await axios.get('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + accessToken, { 
        headers: { 
          authorization: `token ${accessToken}`, 
          accept: 'application/json' 
        }})
        .then(data => {
          console.log(data);
          setData(data);
      }).catch(e => console.log('oAuth token expired'));
    }
  }, [])

  return (
    <div>
      <button id="oAuthBtn" onClick={oAuthHandler}>
        {google}
        <div id="comment">구글 OAuth</div>
      </button>
    </div>
  );
}

export default Test;