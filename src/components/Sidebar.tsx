import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <Sider collapsible>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={[
          {
            key: "/home",
            icon: <HomeOutlined />,
            label: <Link to={"/app/home"}>Главная</Link>,
          },
          {
            key: "/about",
            icon: <InfoCircleOutlined />,
            label: <Link to={"/app/about"}>О сайте</Link>,
          }
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
