import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';

export const Reg1: React.FC<{
  onNext: () => void;
  onPrev: () => void;
}> = ({ onNext, onPrev }) => {

  return (
    <>
      <h1>Регистрация</h1>

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
            <Button block onClick={onPrev}>Назад</Button>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            <Button type="primary" block onClick={onNext}>Далее</Button>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
