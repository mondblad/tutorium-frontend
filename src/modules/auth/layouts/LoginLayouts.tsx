import React from 'react';
import "./LoginLayout.css"
import { Outlet } from 'react-router-dom';
import Sova from '../assets/sova.webp';

export const LoginLayout: React.FC = () => {
  return (
    <div className='login-layout-main'>
      <div className='login-layout-center-block'>
        <div className='login-form'>
          <div className='image-container'>
            <img src={Sova} alt="Google" className='img' />
          </div>

          <div className='form-container'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};