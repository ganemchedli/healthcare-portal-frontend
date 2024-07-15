import React, { useEffect, useState } from "react";

import { List, Avatar, Button, Modal } from "antd";

import { getAllPatients } from "../../services/EmrService";
import UserImage from "../UserImage";
import ElectronicMedicalRecord from "../Electronicmedicalrecord";
import { useNavigate } from "react-router-dom";

// Define a type for the patient data
interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  address: string;
  state: string;
  city: string;
  zipCode: string;
  role: string;
  birthday: string;
  phoneNumber: string;
  image: string;
  electronicMedicalRecordId: number;
}

// If you have props, define them here
interface PatientsProps {
  // You can add props if needed, for example:
  // someProp: string;
}

const ListOfPatients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );

  useEffect(() => {
    getAllPatients().then((response) => {
      setPatients(response.data);
    });
  }, []);

  const openEMR = (id: number) => {
    setSelectedPatientId(id);
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedPatientId(null);
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={patients}
        renderItem={(patient: Patient) => (
          <List.Item
            actions={[
              <Button
                key="list-loadmore-edit"
                onClick={() => openEMR(patient.id)}
              >
                Open EMR
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<UserImage userData={patient} />}
              title={patient.firstName}
              description={`Record ID: ${patient.electronicMedicalRecordId}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title="Electronic Medical Record"
        visible={isModalVisible}
        onOk={handleClose}
        onCancel={handleClose}
        width={1000}
        footer={null} // Remove default buttons
      >
        {selectedPatientId && (
          <ElectronicMedicalRecord patientId={selectedPatientId} />
        )}
      </Modal>
    </>
  );
};

export default ListOfPatients;
