import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import ru_RU from "antd/locale/ru_RU"; // локаль (можно заменить на en_US)
import { router } from "@/router";
//import "./assets/css/App.css";

import { MessageApiGlobal } from '@/utils/messageApi';
import { message } from "antd";

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  MessageApiGlobal.MESSAGE_API = messageApi;

  return (
    <ConfigProvider locale={ru_RU}>
      {contextHolder}
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
