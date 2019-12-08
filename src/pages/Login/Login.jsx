import React, { useState } from 'react';

import GoogleLogin from 'react-google-login';
import styles from './Login.module.scss';
import { Icon } from 'antd';
import Cookies from 'js-cookie';

import api from '../../services/api';

// const TITLE = 'Login';

const Login = () => {
  const [data, setData] = useState();
  const handleSuccess = res => {
    api
      .POST('/login', { Token: res.accessToken })
      .then(serRes => {
        setData(serRes);
        Cookies.set('id', serRes.id);
        Cookies.set('authToken', serRes.authToken);
        Cookies.set('userName', serRes.userName);
      } 
  };

  const handleFailure = res => {
    console.log('error:', res.error);
  };

  return (
    <div className={styles.login}>
      <div className="container">
        <div className="title">
          {/* <img src="/../public/logo512.png" alt="App Logo" /> */}
          <Icon type="ant-design" />
          <h1>IRT - BASED CAT TEST</h1>
        </div>
        <p className="description">Smart testing technology for the future</p>
        <GoogleLogin
          className="google-login"
          clientId="49232506940-j3l8g1uqob63p4usbtl09k9jh9hm3hf2.apps.googleusercontent.com"
          buttonText="Login with Google account"
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          icon={false}
        />
      </div>
      <p className="copyright">Copyright &#169; 2019 UET Handsome Student</p>
    </div>
  );
};

export default Login;
