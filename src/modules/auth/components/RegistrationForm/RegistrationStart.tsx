import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { showMessage } from '@/utils/messageApi';
import { type ApiError, AuthApi, type AuthApiType } from '@/api';

export const RegistrationStart: React.FC<{
  setToken: (token: string | null) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setToken, setLoading }) => {
  const [form] = Form.useForm();

  const handleNext = async () => {
    setLoading(true);

    const values = await form.validateFields().catch(() => { setLoading(false); return; });
    const { username, password, rePassword } = values;

    if (password !== rePassword) {
      showMessage("error", "Пароли не совпадают");
      setLoading(false);
      return;
    }

    const requestBody: AuthApiType.AuthRequest = {
      email: username,
      password: password,
    };

    await AuthApi.postApiEmailRegistrationRegistrationInitiateRegistration({ body: requestBody })
      .then((response) => {
        if (response.error) {
          const code = (response.error as ApiError).code;
          if (code === "PASSWORD_NO_UPPERCASE")
            showMessage("error", "Пароль должен содержать хотя бы одну заглавную букву");
          if (code === "PASSWORD_REQUIRED")
            showMessage("error", "Введите пароль");
          if (code === "PASSWORD_TOO_SHORT")
            showMessage("error", "Пароль слишком короткий");
        }

        if (response.data?.registrationToken) setToken(response.data.registrationToken);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Form
      form={form}
      layout="vertical"
    >
      <h1 style={{ textAlign: "center" }}>Регистрация</h1>

      <Form.Item
        label="Почта"
        name="username"
        rules={[{ required: true, message: 'Введите логин' }]}
      >
        <Input placeholder="Введите логин" />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Введите логин' }]}
      >
        <Input.Password placeholder="Введите логин" />
      </Form.Item>

      <Form.Item
        label="Повторите пароль"
        name="rePassword"
        rules={[{ required: true, message: 'Введите логин' }]}
      >
        <Input.Password placeholder="Введите логин" />
      </Form.Item>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Button block onClick={() => setToken(null)}>Назад</Button>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            <Button type="primary" block onClick={handleNext}>Далее</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
