import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RegistrationStart } from "./RegistrationStart";
import { RegistrationConfirm } from "./RegistrationConfirm";
import { Spin } from "antd";

export const RegistrationForm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState<boolean>(false);

  const setToken = (newToken: string | null) => {
    if (newToken)
      setSearchParams({ token: newToken });
    else
      setSearchParams({});
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "300px",
          height: "auto",
          boxSizing: "border-box",
        }}
      >
        <Spin spinning={loading}>
          {token === null && (
            <RegistrationStart setToken={setToken} setLoading={setLoading} />
          )}

          {token !== null && (
            <RegistrationConfirm token={token} setLoading={setLoading} />
          )}
        </Spin>
      </div>
    </div>
  );
};
