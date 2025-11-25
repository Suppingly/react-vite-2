// src/features/auth/pages/LoginPage.tsx
import React from 'react';
import AuthForm from '../components/AuthForm';

const LoginPage: React.FC = () => {
  return (
    <div className='auth-page'>
      <AuthForm />
    </div>
  );
};

export default LoginPage;
