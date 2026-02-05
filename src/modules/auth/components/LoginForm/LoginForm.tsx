import React from 'react';
import { Form, Input, Button } from 'antd';
import GoogleIcon from '../../assets/google.png';
import Sova from '../../assets/sova.webp';
import "./LoginForm.css"
import { AuthApi } from "@/api";

type LoginFormValues = {
  username: string;
  password: string;
};

export const LoginComponent: React.FC = () => {
  const onFinish = async (values: LoginFormValues) => {
    try {
      await AuthApi.EmailPasswordService.postApiEmailPasswordLogin({
        email: values.username,
        password: values.password,
      });

      //message.success('Успешный вход');
      // TODO: redirect
    } catch {
      //message.error('Ошибка входа');
    }
  };

  return (
    <div className='login-form'>
      <div className='image-container'>
        <img src={Sova} alt="Google" className='img' />
      </div>

      <div className='form-container'>
        <h1>Вход в систему</h1>
        <Button className='google-btn'>
          <img src={GoogleIcon} alt="Google" className='join-icon' />
        </Button>

        <Form name="login" layout="vertical" className='login-form-join' onFinish={onFinish}>
          <Form.Item
            label="Логин"
            name="username"
            rules={[{ required: true, message: 'Введите логин' }]}
          >
            <Input placeholder="Введите логин" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>Войти</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};



