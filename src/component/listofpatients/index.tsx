import React, { useEffect, useState } from "react";

import { List, Button, Modal } from "antd";

import {
  getAllPatients,
  getEmrByDoctorId,
  getEmrByNurseId,
  getPatientByEmrId,
} from "../../services/EmrService";
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
  doctorId: Number;
  nurseId: Number;
}
const ListOfPatients: React.FC<Props> = (Props: Props) => {
  const { doctorId, nurseId } = Props;
  const [patients, setPatients] = useState<Patient[]>([]);
  const [emrs, setEmrs] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState<String | null>(null);

  useEffect(() => {
    fetchEmrsAndPatients();
  }, []);

  const fetchEmrsAndPatients = async () => {
    let emrResponse;
    if (doctorId === 0) {
      emrResponse = await getEmrByNurseId(nurseId);
    } else {
      emrResponse = await getEmrByDoctorId(doctorId);
    }

    const emrsData = emrResponse.data;
    setEmrs(emrsData);

    if (emrsData.length > 0) {
      const patientPromises = emrsData.map((emr: any) =>
        getPatientByEmrId(emr.id)
      );
      const patientResponses = await Promise.all(patientPromises);

      // Flatten and ensure unique patients
      const allPatients = patientResponses
        .flatMap((response) => response.data)
        .reduce((uniquePatients, patient) => {
          if (!uniquePatients.some((p: any) => p.id === patient.id)) {
            uniquePatients.push(patient);
          }
          return uniquePatients;
        }, [] as Patient[]);

      setPatients(allPatients);
    }
  };

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
