import { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FolderAddOutlined,
  UserOutlined,
  CalendarOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu, theme } from "antd";
import ListOfPatients from "../../component/listofpatients";
import Appointments from "../../component/appointment";
import ElectronicMedicalRecord from "../../component/electronicmedicalrecord";
import Messaging from "../../component/messaging";
interface DoctorProps {
  // Add any props you need for the component here
}
const { Header, Sider, Content } = Layout;

const patientInfo: any = {
  name: "Alex Johnson",
  age: 29,
  gender: "Male",
  patientImageUrl: "https://randomuser.me/api/portraits/men/29.jpg", // URL from a public API for placeholder images
};

const Doctor: React.FC<DoctorProps> = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("1"); // State to track active menu item
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Function to handle menu item click
  const onMenuClick = (key: string) => {
    setActiveMenu(key);
  };

  // Render different components based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "1":
        return (
          <div>
            <ListOfPatients />
          </div>
        );
      case "2":
        return (
          <div>
            <ElectronicMedicalRecord patientId="123" pat />
          </div>
        );
      case "3":
        return (
          <div>
            <Appointments />
          </div>
        );
      case "4":
        return (
          <div>
            <Messaging />
          </div>
        );
      default:
        return <div>Content</div>;
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out...");
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{ padding: 20 }}>
          <img
            src="src\assets\photo.png"
            alt="User"
            style={{ width: "100%", borderRadius: "50%" }}
          />
          <div className="pt-4 fw-bold text-center text-white">
            Name of the doctor
          </div>
          <div className="text-center text-white">DOCTOR</div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "List of patients",
              onClick: () => onMenuClick("1"),
            },
            {
              key: "2",
              icon: <FolderAddOutlined />,
              label: "Create a new EMR",
              onClick: () => onMenuClick("2"),
            },
            {
              key: "3",
              icon: <CalendarOutlined />,
              label: "Appointments",
              onClick: () => onMenuClick("3"),
            },
            {
              key: "4",
              icon: <MessageOutlined />,
              label: "Messages",
              onClick: () => onMenuClick("4"),
            },
          ]}
          style={{ flex: 1 }} // Make the menu use available space
        />
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ marginTop: 200, marginLeft: 16 }}
        >
          Logout
        </Button>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 618,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Doctor;
