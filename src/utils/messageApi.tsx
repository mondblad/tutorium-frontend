import { message } from "antd";

export type MessageApiConfig = {
  MESSAGE_API?: ReturnType<typeof message.useMessage>[0]; // тип messageApi
  REFRESH?: Date;
};

export const MessageApiGlobal: MessageApiConfig = {
  MESSAGE_API: undefined,
  REFRESH: undefined,
};

export const showMessage = (
  type: "info" | "success" | "error" | "warning" | "loading",
  content: string,
  duration?: number
) => {
  MessageApiGlobal.MESSAGE_API?.open({
    type,
    content,
    duration: duration ?? 5,
  });
};