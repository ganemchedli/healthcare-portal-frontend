import React, { useState, useEffect } from "react";
import {
  List,
  Button,
  Radio,
  RadioChangeEvent,
  Avatar,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  notification,
} from "antd";
import moment from "moment";
import { getPatientByEmailByClient } from "../../services/EmrService";
import {
  createAppointment,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId,
} from "../../services/AppointmentService";
import { getUser } from "../../services/UserServices";
import { updateAppointment } from "../../services/AppointmentService";
import UserImage from "../UserImage";

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
interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  appointmentTime: string;
  status: "COMPLETED" | "SCHEDULED" | "CANCELED";
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorsData, setDoctorsData] = useState<Patient[]>([]);
  const [patientData, setPatientData] = useState<Patient>();
  const [patientsData, setPatientsData] = useState<Patient[]>([]);
  const [appointmentTime, setAppointmentTime] = useState<string>("");
  const [status, setStatus] = useState<"COMPLETED" | "SCHEDULED" | "CANCELED">(
    "SCHEDULED"
  );
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [email, setEmail] = useState<string>("");
  const [filter, setFilter] = useState<
    "All" | "COMPLETED" | "SCHEDULED" | "CANCELED"
  >("All");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const userRole = localStorage.getItem("User role");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchedAppointments(userId);
  }, [userId]);

  useEffect(() => {
    setFilteredAppointments(
      appointments.filter(
        (appointment) => filter === "All" || appointment.status === filter
      )
    );
    fetchPatientsData();
    fetchDoctorsData();
    console.log("Doctors Data:", doctorsData);
  }, [appointments, filter]);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const fetchedAppointments = async (id: any) => {
    try {
      if (userRole === "PATIENT") {
        const response = await getAppointmentsByPatientId(id);
        setAppointments(response.data);
      } else {
        const response = await getAppointmentsByDoctorId(id);
        setAppointments(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };
  const fetchPatientData = async (email: string): Promise<void> => {
    try {
      const fetchedPatient = await getPatientByEmailByClient(email);
      setPatientData(fetchedPatient);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDoctorsData = async (): Promise<void> => {
    try {
      appointments.forEach(async (appointment) => {
        const fetchedDoctor = await getUser(appointment.doctorId);
        setDoctorsData([...doctorsData, fetchedDoctor.data]);
      });
    } catch (err) {
      console.error(err);
    }
  };
  const fetchPatientsData = async (): Promise<void> => {
    try {
      appointments.forEach(async (appointment) => {
        const fetchedPatient = await getUser(appointment.patientId);
        setPatientsData([...patientsData, fetchedPatient.data]);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const finishAppointment = async (id: number) => {
    try {
      const response = await updateAppointment(id, {
        status: "COMPLETED",
      });
      console.log("Appointment updated:", response);
      notification.success({
        message: "Appointment Updated",
        description: "The appointment have been updated successfully.",
      });
    } catch (err) {
      notification.error({
        message: "Failed to update appointment",
        description: "There was an error updating the appointment.",
      });
      console.error(err);
    }
  };

  const handleOk = async () => {
    try {
      setIsModalVisible(false);
      // Ensure patient data is fetched before proceeding
      await fetchPatientData(email);

      if (patientData) {
        const newAppointment = {
          patientId: patientData.id,
          doctorId: Number(userId),
          appointmentTime: appointmentTime,
          status: status,
        };
        console.log("Appointment object", newAppointment);
        try {
          const response = await createAppointment(newAppointment);
          console.log("Appointment created:", response);
          if (response.status === 200) {
            console.log("Appointment created successfully");
            setAppointments([...appointments, response.data]);
          }
        } catch (err) {
          console.error(err);
        }
      }
    } catch (error) {
      console.error("Failed to fetch patient data:", error);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleAppointmentTimeChange = (
    value: moment.Moment | null,
    dateString: string
  ) => {
    if (value) {
      // Update the state with the formatted date string
      setAppointmentTime(dateString);
      console.log("Updated Appointment Time: ", dateString);
    }
  };
  const handleAppointmentStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStatus(event.target.value as "COMPLETED" | "SCHEDULED" | "CANCELED");
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <Radio.Group
        onChange={(e: RadioChangeEvent) => setFilter(e.target.value)}
        value={filter}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value="All">All</Radio.Button>
        <Radio.Button value="COMPLETED">Completed</Radio.Button>
        <Radio.Button value="SCHEDULED">Scheduled</Radio.Button>
        <Radio.Button value="CANCELED">Canceled</Radio.Button>
      </Radio.Group>
      <List
        itemLayout="horizontal"
        dataSource={filteredAppointments}
        renderItem={(appointment) => {
          const patient = patientsData.find(
            (p) => p.id === appointment.patientId
          );
          const doctor = doctorsData.find((d) => d.id === appointment.doctorId);
          if (userRole === "PATIENT") {
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={doctor && <UserImage userData={doctor} />}
                  title={`Appointment ID ${appointment.id}`}
                  description={`Patient ID: ${
                    appointment.patientId
                  }, Doctor ID: ${appointment.doctorId} - Date: ${moment(
                    appointment.appointmentTime
                  ).format("MMMM Do YYYY, h:mm a")} - Status: ${
                    appointment.status
                  }`}
                />
              </List.Item>
            );
          } else if (userRole === "DOCTOR") {
            return (
              <List.Item
                actions={[
                  <Button
                    key="finish"
                    type="primary"
                    onClick={() => finishAppointment(appointment.id)}
                  >
                    Finish
                  </Button>,
                  <Button
                    key="postpone"
                    onClick={() =>
                      console.log(
                        "Postponing appointment with ID:",
                        appointment.id
                      )
                    }
                  >
                    Postpone
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={patient && <UserImage userData={patient} />}
                  title={`Appointment ID ${appointment.id}`}
                  description={`Patient ID: ${
                    appointment.patientId
                  }, Doctor ID: ${appointment.doctorId} - Date: ${moment(
                    appointment.appointmentTime
                  ).format("MMMM Do YYYY, h:mm a")} - Status: ${
                    appointment.status
                  }`}
                />
              </List.Item>
            );
          }
        }}
      />
      <Button
        type="primary"
        style={{ position: "absolute", right: 10, top: 0 }}
        onClick={showModal}
      >
        Add Appointment
      </Button>
      <Modal
        title="Create New Appointment"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item
            label="Patient email"
            name="email"
            rules={[
              { required: true, message: "Please input the patient email!" },
            ]}
          >
            <Input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Form.Item>

          <Form.Item
            label="Date and Time"
            name="appointmentTime"
            rules={[
              { required: true, message: "Please select the date and time!" },
            ]}
          >
            <DatePicker showTime onChange={handleAppointmentTimeChange} />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select onChange={handleAppointmentStatusChange}>
              <Select.Option value="SCHEDULED">Scheduled</Select.Option>
              <Select.Option value="COMPLETED">Completed</Select.Option>
              <Select.Option value="CANCELED">Canceled</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Appointments;
