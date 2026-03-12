import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { AuthApi, AuthApiType } from "@/api";
import { useNavigate } from "react-router-dom";

import { showMessage } from '@/utils/messageApi';
const { Title } = Typography;

export const RegistrationConfirm: React.FC<{
  token: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ token, setLoading }) => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState<string | null>();
  const navigate = useNavigate();

  const handleNext = async () => {
    setLoading(true);

    const values = await form.validateFields().catch(() => { setLoading(false); return; });
    const { code } = values;

    const requestBody: AuthApiType.ConfirmRegistrationRequest = { code: code };

    await AuthApi.postApiEmailRegistrationRegistrationConfirmRegistrationByToken({ body: requestBody, path: { token: token } })
      .then(() => { console.log("aw"); setLoading(false); navigate("/home"); })
      .catch((ex) => {
        console.log(":aw");

        const code = ex?.body?.error?.code;
        if (!code) {
          showMessage("error", "Пока что просто ошибка");
          return;
        }
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    async function handleToken() {
      if (token) {
        await AuthApi.getApiEmailRegistrationRegistrationEmailByToken({ path: { token: token } })
          .then((response) => { if (response.data) setEmail(response.data.email); })
      }
    }

    handleToken();
  }, [token]);

  function maskEmail(email: string | null | undefined) {
    if (email === null || email === undefined)
      return "";

    const [name, domain] = email.split("@");
    const maskedName = name.length <= 2
      ? "*".repeat(name.length)
      : name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
    return `${maskedName}@${domain}`;
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Регистрация</h1>
      <Title level={5} style={{ textAlign: "center" }}>
        Код был отправлен вам на почту {maskEmail(email)}.
      </Title>
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          label="Код подтверждения"
          name="code"
          rules={[{ required: true, message: 'Введите код' }]}
        >
          <Input placeholder="Введите код" />
        </Form.Item>

        <Row gutter={24}>
          <Col span={12} />

          <Col span={12}>
            <Form.Item>
              <Button type="primary" block onClick={handleNext}>Далее</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
