import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Form } from "antd";
import { Reg1 } from "./Reg1";
import { Reg2 } from "./Reg2";
import { AuthApi } from "@/api";

export const RegistrationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [token, setToken] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function handleToken() {
      let urlToken = searchParams.get("token");

      if (!urlToken) {
        urlToken = await AuthApi.EmailRegistrationService.postRegistration();
        setSearchParams({ token: urlToken });
      }

      setToken(urlToken);

      const userData = await AuthApi.EmailRegistrationService.getRegistration(urlToken);

      form.setFieldsValue(userData);
    }

    handleToken();
  }, []);

  const onFormValuesChange = async (
    changedValues: unknown,
    allValues: unknown
  ) => {
    console.log(changedValues);
    console.log(allValues);
  };

  if (!token) return <div>Loading...</div>;

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={onFormValuesChange}
    >
      {currentStep === 0 && (
        <Reg1
          onNext={() => setCurrentStep(1)}
          onPrev={() => setCurrentStep(9)}
        />
      )}

      {currentStep === 1 && (
        <Reg2
          onPrev={() => setCurrentStep(0)}
          onNext={() => setCurrentStep(2)}
        />
      )}
    </Form>
  );
};
