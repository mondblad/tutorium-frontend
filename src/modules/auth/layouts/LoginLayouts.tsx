import React from 'react';
import { LoginComponent } from "../components/LoginForm/LoginForm"
import "./LoginLayout.css"
 
export const LoginLayout: React.FC = () => {
  return (
    <div className='login-layout-main'>
      <div className='login-layout-center-block'>
        <LoginComponent />
      </div>
    </div>
  );
};