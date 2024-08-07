import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Ant design components
import {
  FolderAddOutlined,
  UserOutlined,
  CalendarOutlined,
  MessageOutlined,
  LogoutOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Spin } from "antd";
//services
import { logout } from "../../services/AuthServices";
import { getUser } from "../../services/UserServices";
//components
import ListOfPatients from "../../component/Listofpatients";
import Appointments from "../../component/Appointment";
import EmrForm from "../../component/EmrForm";
import Messaging from "../../component/Messaging";
import UserImage from "../../component/UserImage";
const { Header, Sider, Content } = Layout;

interface DoctorProps {
  // Add any props you need for the component here
}
const Doctor: React.FC<DoctorProps> = () => {
  const [activeMenu, setActiveMenu] = useState("1"); // State to track active menu item
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [doctorData, setDocotorData] = useState<any>({});
  const navigate = useNavigate();
  // Function to handle menu item click
  const onMenuClick = (key: string) => {
    setActiveMenu(key);
  };

  // Render different components based on active menu
  const renderContent = () => {
    if (!doctorData) {
      return (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      ); // or a loading spinner
    }

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
            <EmrForm />
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
    navigate("/login");
  };

  const getDoctorData = () => {
    const idString = localStorage.getItem("userId");
    const id = parseInt(idString!);
    getUser(id)
      .then((response) => {
        setDocotorData(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDoctorData();
  }, []);
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
          <UserImage userData={doctorData} />

          {/* <Avatar src={"src/assets/photo.jpg"} size={}></Avatar> */}
          <div className="pt-4 fw-bold text-center text-white">
            {doctorData.firstName + " " + doctorData.lastName}
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
          style={{ marginTop: 300, marginLeft: 16 }}
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
