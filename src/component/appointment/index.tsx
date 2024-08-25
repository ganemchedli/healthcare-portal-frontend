import React, { useState, useEffect } from "react";
import {
  List,
  Button,
  Radio,
  RadioChangeEvent,
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
  getAppointmentsByNurseId,
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
  nurseId: number;
  appointmentTime: string;
  status: "COMPLETED" | "SCHEDULED" | "CANCELED";
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorsData, setDoctorsData] = useState<Patient[]>([]);
  const [nursesData, setNursesData] = useState<Patient[]>([]);
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
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    number | null
  >(null);
  const [postponeDate, setPostponeDate] = useState<string>("");
  const [isPostponeModalVisible, setPostponeModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const userRole = localStorage.getItem("User role");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchedAppointments(userId);
  }, [userId, refreshKey]);

  useEffect(() => {
    setFilteredAppointments(
      appointments.filter(
        (appointment) => filter === "All" || appointment.status === filter
      )
    );
    fetchPatientsData();
    if (userRole === "DOCTOR") {
      fetchDoctorsData();
    } else {
      fetchNursesData();
    }

    // console.log("Doctors Data:", doctorsData);
  }, [appointments, filter]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModal2 = (appointmentId: number) => {
    setSelectedAppointmentId(appointmentId);
    setPostponeModalVisible(true);
  };
  const fetchedAppointments = async (id: any) => {
    try {
      if (userRole === "PATIENT") {
        const response = await getAppointmentsByPatientId(id);
        setAppointments(response.data);
      } else if (userRole === "DOCTOR") {
        const response = await getAppointmentsByDoctorId(id);
        setAppointments(response.data);
      } else {
        const response = await getAppointmentsByNurseId(id);
        setAppointments(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  const fetchPatientData = async (email: string): Promise<Patient | null> => {
    try {
      const result = await getPatientByEmailByClient(email);
      setPatientData(result);
      return result; // Ensure that this returns the fetched patient data
    } catch (error) {
      console.error("Error fetching patient data:", error);
      return null;
    }
  };

  const fetchDoctorsData = async () => {
    try {
      const fetchedDoctors = await Promise.all(
        appointments
          .filter((appointment) => appointment.doctorId)
          .map((appointment) => getUser(appointment.doctorId))
      );
      setDoctorsData(fetchedDoctors.map((doctor) => doctor.data));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNursesData = async () => {
    try {
      const fetchedNurses = await Promise.all(
        appointments
          .filter((appointment) => appointment.nurseId)
          .map((appointment) => getUser(appointment.nurseId))
      );
      setNursesData(fetchedNurses.map((nurse) => nurse.data));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPatientsData = async () => {
    try {
      const patientPromises = appointments.map(async (appointment) => {
        const fetchedPatient = await getUser(appointment.patientId);
        return fetchedPatient.data;
      });
      const patients = await Promise.all(patientPromises);
      setPatientsData(patients);
    } catch (err) {
      console.error(err);
    }
  };

  const finishAppointment = async (id: number) => {
    try {
      const response = await updateAppointment(id, {
        status: "COMPLETED",
      });
      if (response.status === 200) {
        // Update the appointment status in the local state
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === id
              ? { ...appointment, status: "COMPLETED" }
              : appointment
          )
        );
        notification.success({
          message: "Appointment Updated",
          description: "The appointment has been updated successfully.",
        });
      }
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
      const fetchedPatientData = await fetchPatientData(email);

      if (fetchedPatientData) {
        const newAppointment = {
          patientId: fetchedPatientData.id,
          doctorId: userRole === "DOCTOR" ? Number(userId) : 0,
          nurseId: userRole === "NURSE" ? Number(userId) : 0,
          appointmentTime: appointmentTime,
          status: status,
        };

        const response = await createAppointment(newAppointment);
        if (response.status === 200) {
          setAppointments([...appointments, response.data]);
          setRefreshKey((prevKey) => prevKey + 1); // Trigger refresh
        }
      }
    } catch (error) {
      console.error("Failed to create appointment:", error);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleAppointmentStatusChange = (
    value: "COMPLETED" | "SCHEDULED" | "CANCELED"
  ) => {
    setStatus(value);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAppointmentTimeChange = (
    value: moment.Moment | null,
    dateString: string
  ) => {
    if (value) {
      // Update the state with the formatted date string
      setAppointmentTime(dateString);
    }
  };

  const handlePostponeDateChange = (
    value: moment.Moment | null,
    dateString: string
  ) => {
    if (value) {
      setPostponeDate(dateString);
    }
  };

  const handlePostpone = async () => {
    if (selectedAppointmentId) {
      try {
        const response = await updateAppointment(selectedAppointmentId, {
          appointmentTime: postponeDate,
        });
        console.log("Appointment postponed:", response);
        notification.success({
          message: "Appointment Postponed",
          description: "The appointment date has been successfully postponed.",
        });
        setIsModalVisible(false);
        setRefreshKey((prevKey) => prevKey + 1);
      } catch (error) {
        notification.error({
          message: "Failed to postpone appointment",
          description: "There was an error postponing the appointment.",
        });
        console.error(error);
      }
    }
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
          const nurse = nursesData.find((n) => n.id === appointment.nurseId);
          const doctor = doctorsData.find((d) => d.id === appointment.doctorId);
          if (userRole === "PATIENT") {
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={doctor && <UserImage userData={doctor} />}
                  title={`Appointment ID ${appointment.id}`}
                  description={`Patient ID: ${appointment.patientId}, ${
                    appointment.doctorId
                      ? `Doctor ID: ${appointment.doctorId}`
                      : `Nurse ID: ${appointment.nurseId}`
                  } - Date: ${moment(appointment.appointmentTime).format(
                    "MMMM Do YYYY, h:mm a"
                  )} - Status: ${appointment.status}`}
                />
              </List.Item>
            );
          } else if (userRole === "DOCTOR" || userRole === "NURSE") {
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
                    onClick={() => showModal2(appointment.id)}
                  >
                    Postpone
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={patient && <UserImage userData={patient} />}
                  title={`${
                    patient?.firstName + " " + patient?.lastName
                  } - Date: ${moment(appointment.appointmentTime).format(
                    "MMMM Do YYYY, h:mm a"
                  )}`}
                  description={`Status: ${appointment.status}`}
                />
              </List.Item>
            );
          }
        }}
      />
      {userRole === "PATIENT" ? (
        <Button
          type="primary"
          style={{ position: "absolute", right: 10, top: 0 }}
          onClick={showModal}
        >
          Book an Appointment
        </Button>
      ) : (
        <Button
          type="primary"
          style={{ position: "absolute", right: 10, top: 0 }}
          onClick={showModal}
        >
          Add an Appointment
        </Button>
      )}
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
      <Modal
        title="Postpone Appointment"
        visible={isPostponeModalVisible}
        onOk={handlePostpone}
        onCancel={() => setPostponeModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item
            label="New Date and Time"
            name="postponeDate"
            rules={[
              {
                required: true,
                message: "Please select the new date and time!",
              },
            ]}
          >
            <DatePicker showTime onChange={handlePostponeDateChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Appointments;
