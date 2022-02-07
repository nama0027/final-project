import React from 'react';
import LoginForm from '../components/LoginForm';
import PageTitle from '../components/PageTitle';

const Login = () => {
  const paragraphText = 'Log in to access member portal!';
  return (
    <>
      <PageTitle headingText="Log in" description={paragraphText} />
      <LoginForm />
    </>
  );
};

export default Login;
