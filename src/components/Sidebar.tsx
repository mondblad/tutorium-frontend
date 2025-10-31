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
            key: "/",
            icon: <HomeOutlined />,
            label: <Link to="/">Главная</Link>,
          },
          {
            key: "/about",
            icon: <InfoCircleOutlined />,
            label: <Link to="/about">О сайте</Link>,
          }
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
