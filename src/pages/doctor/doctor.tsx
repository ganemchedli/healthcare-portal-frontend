import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FolderAddOutlined,
  UserOutlined,
  CalendarOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

import { logout } from "../../services/AuthServices";

import ListOfPatients from "../../component/Listofpatients";
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

const Doctor: React.FC<DoctorProps> = () => {
  const [activeMenu, setActiveMenu] = useState("1"); // State to track active menu item
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
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
            <ElectronicMedicalRecord patientId="123" />
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
    logout();
    navigate("/");
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

export default Doctor;
