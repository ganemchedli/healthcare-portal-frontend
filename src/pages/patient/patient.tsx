import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  FolderAddOutlined,
  CalendarOutlined,
  MessageOutlined,
  LogoutOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Spin } from "antd";

import { logout } from "../../services/AuthServices";
import {
  getPatientByEmailByClient,
  getPatientByEmailOnly,
  getPatientById,
} from "../../services/EmrService";
import { getUser } from "../../services/UserServices";
import UserImage from "../../component/UserImage";
import Appointments from "../../component/Appointment";
import ElectronicMedicalRecord from "../../component/Electronicmedicalrecord";
import Messaging from "../../component/Messaging";
import Profile from "../../component/User/profile";

const { Header, Sider, Content } = Layout;

const Patient: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("2"); // State to track active menu item
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [patientData, setPatientData] = useState<any>(null);

  const navigate = useNavigate();

  const id = localStorage.getItem("userId");

  useEffect(() => {
    fetchPatientData(id);
    console.log("Patient data", patientData);
  }, [id]);

  const fetchPatientData = async (id: string | null) => {
    try {
      const response = await getUser(id);
      setPatientData(response.data);
      // Do something with the patient data
    } catch (error) {
      console.log("Error fetching patient data: ", error);
    }
  };
  // Function to handle menu item click
  const onMenuClick = (key: string) => {
    setActiveMenu(key);
  };
  // Render different components based on active menu
  const renderContent = () => {
    if (!patientData) {
      return (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      ); // or a loading spinner
    }

    switch (activeMenu) {
      case "1":
        return (
          <div>
            <Appointments />
          </div>
        );
      case "2":
        return (
          <div>
            <ElectronicMedicalRecord patientEmail={patientData.email} />
          </div>
        );
      case "3":
        return (
          <div>
            <Messaging />
          </div>
        );
      case "4":
        return (
          <div>
            <Profile />
          </div>
        );
      default:
        return <div>Content</div>;
    }
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
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
          {patientData && <UserImage userData={patientData} />}
          <div className="pt-4 fw-bold text-center text-white">
            {patientData?.firstName + " " + patientData?.lastName}
          </div>
          <div className="text-center text-white">Patient</div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "2",
              icon: <CalendarOutlined />,
              label: "Appointments",
              onClick: () => onMenuClick("1"),
            },
            {
              key: "1",
              icon: <FolderAddOutlined />,
              label: "View my EMR",
              onClick: () => onMenuClick("2"),
            },
            {
              key: "3",
              icon: <MessageOutlined />,
              label: "Messages",
              onClick: () => onMenuClick("3"),
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: "Profile",
              onClick: () => onMenuClick("4"),
            },
          ]}
          style={{ flex: 1 }} // Make the menu use available space
        />
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ marginTop: 280, marginLeft: 16 }}
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
