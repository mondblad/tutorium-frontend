import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import ru_RU from "antd/locale/ru_RU"; // локаль (можно заменить на en_US)
import { router } from "./router";

const App: React.FC = () => {
  return (
    <ConfigProvider locale={ru_RU}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
