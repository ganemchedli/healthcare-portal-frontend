import React from "react";

import { List, Avatar, Button } from "antd";

// Define a type for the patient data
interface Patient {
  id: number;
  name: string;
  profileImageUrl: string;
  recordId: string;
  nextAppointment: string;
}

// If you have props, define them here
interface PatientsProps {
  // You can add props if needed, for example:
  // someProp: string;
}

const ListOfPatients: React.FC<PatientsProps> = (props) => {
  // Static list of patients for demonstration
  const patients: Patient[] = [
    {
      id: 1,
      name: "John Doe",
      profileImageUrl: "https://i.pravatar.cc/150?img=1",
      recordId: "123",
      nextAppointment: "2021-10-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      profileImageUrl: "https://i.pravatar.cc/150?img=2",
      recordId: "124",
      nextAppointment: "2021-10-01",
    },
    // Add more patients as needed
  ];

  // Function to handle opening the EMR
  const openEMR = (recordId: string) => {
    console.log("Opening EMR for record ID:", recordId);
    // Add actual navigation or modal opening logic here
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={patients}
      renderItem={(patient: Patient) => (
        <List.Item
          actions={[
            <Button
              key="list-loadmore-edit"
              onClick={() => openEMR(patient.recordId)}
            >
              Open EMR
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar size={60} src={patient.profileImageUrl} />}
            title={patient.name}
            description={
              `Record ID: ${patient.recordId}` +
              ` | Next Appointment: ${patient.nextAppointment}`
            }
          />
        </List.Item>
      )}
    />
  );
};

export default ListOfPatients;
