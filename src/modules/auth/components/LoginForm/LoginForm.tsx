import React from 'react';
import { Form, Input, Button } from 'antd';
import GoogleIcon from '../../assets/google.png';
import "./LoginForm.css"
import { AuthApi } from "@/api";
import { Link } from "react-router-dom";

type LoginFormValues = {
  username: string;
  password: string;
};

export const LoginComponent: React.FC = () => {
  const onFinish = async (values: LoginFormValues) => {
    await AuthApi.postApiEmailRegistrationLogin({
      body: {
        email: values.username,
        password: values.password,
      }
    });
  };

  return (
    <>
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

      <Link to="/registr">
        <Button>
          Зарегестрироваться
        </Button>
      </Link>
    </>
  );
};

