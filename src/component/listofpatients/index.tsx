import React, { useEffect, useState } from "react";

import { List, Button, Modal } from "antd";

import { getAllPatients } from "../../services/EmrService";
import UserImage from "../UserImage";
import ElectronicMedicalRecord from "../Electronicmedicalrecord";

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
interface Props {
  doctorId: string;
  nurseId: string;
}
const ListOfPatients: React.FC<Props> = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState<String | null>(null);

  useEffect(() => {
    getAllPatients().then((response) => {
      setPatients(response.data);
    });
  }, []);

  const openEMR = (email: string) => {
    setEmail(email);
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setEmail(null);
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
                onClick={() => openEMR(patient.email)}
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
        {email && <ElectronicMedicalRecord patientEmail={email} />}
      </Modal>
    </>
  );
};

export default ListOfPatients;
