import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  FolderAddOutlined,
  CalendarOutlined,
  MessageOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

import { logout } from "../../services/AuthServices";
import {
  getPatientByEmailByClient,
  getPatientByEmailOnly,
  getPatientById,
} from "../../services/EmrService";
import UserImage from "../../component/UserImage";
import Appointments from "../../component/Appointment";
import ElectronicMedicalRecord from "../../component/Electronicmedicalrecord";
import Messaging from "../../component/Messaging";

const { Header, Sider, Content } = Layout;

const Patient: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("1"); // State to track active menu item
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [patientData, setPatientData] = useState<any>(null);

  const navigate = useNavigate();
  // Function to handle menu item click
  const onMenuClick = (key: string) => {
    setActiveMenu(key);
  };
  const email = localStorage.getItem("User email");
  // Retrieve patient data by Id
  useEffect(() => {
    fetchPatientData();
  }, [email]);

  const fetchPatientData = async () => {
    try {
      const patientData = await getPatientByEmailOnly(email);
      setPatientData(patientData);
      // Do something with the patient data
    } catch (error) {
      console.log("Error fetching patient data: ", error);
    }
  };
  // Render different components based on active menu
  const renderContent = () => {
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
            <ElectronicMedicalRecord patientId={patientData?.id} />
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
          {/* <UserImage userData={patientData} /> */}
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
