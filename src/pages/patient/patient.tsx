import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FolderAddOutlined,
  UserOutlined,
  CalendarOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu, theme, Avatar } from "antd";
import Appointments from "../../component/Appointment";
import ElectronicMedicalRecord from "../../component/Electronicmedicalrecord";
import Messaging from "../../component/Messaging";
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

const Patient: React.FC<DoctorProps> = () => {
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
            <ElectronicMedicalRecord patientId="123" />
          </div>
        );
      case "2":
        return (
          <div>
            <Appointments />
          </div>
        );
      case "3":
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
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        trigger={null}
      >
        <div className="demo-logo-vertical" style={{ padding: 20 }}>
          <img
            src="src\assets\photo.jpg"
            alt="User"
            style={{ width: "100%", borderRadius: "100%" }}
          />
          {/* <Avatar src={"src/assets/photo.jpg"} size={}></Avatar> */}
          <div className="pt-4 fw-bold text-center text-white">
            Name of the Patient
          </div>
          <div className="text-center text-white">Patient</div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <FolderAddOutlined />,
              label: "View my EMR",
              onClick: () => onMenuClick("1"),
            },
            {
              key: "2",
              icon: <CalendarOutlined />,
              label: "Appointments",
              onClick: () => onMenuClick("2"),
            },
            {
              key: "3",
              icon: <MessageOutlined />,
              label: "Messages",
              onClick: () => onMenuClick("3 "),
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
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }}></Header>
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

export default Patient;
