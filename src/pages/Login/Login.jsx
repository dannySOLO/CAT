import React, { useState, useEffect } from 'react';

import GoogleLogin from 'react-google-login';
import styles from './Login.module.scss';

import Container from '../Container/Container';
import api from '../../services/api';

const TITLE = 'Login';

const Login = props => {
  const handleSuccess = res => {
    console.log(res);
    api
      .POST('/login', { googleTokenId: res.tokenId })
      .then(serverRes => console.log(serverRes));
  };

  const handleFailure = res => {
    console.log(res.error);
  };

  return (
    <Container title={TITLE}>
      <div className={styles.login}>
        <div className="container">
          <GoogleLogin
            clientId="49232506940-j3l8g1uqob63p4usbtl09k9jh9hm3hf2.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
          />
        </div>
      </div>
    </Container>
  );
};

export default Login;
