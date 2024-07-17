import { useEffect, useState } from "react";
import {
  deleteAppointment,
  getAllAppointments,
} from "../../services/AppointmentService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalComponent from "../Modal"; // adjust the path as necessary
import AddUserComponent from "../AddUser";
import "./index.css";
interface Appointment {
  id: number;
  appointmentTime: string;
  status: string;
  doctorId: number;
  patientId: number;
}

const ListAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const navigator = useNavigate();

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  const openModalWithComponent = (component: React.ReactNode) => {
    setModalContent(component);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const fetchAllAppointments = async () => {
    try {
      const response = await getAllAppointments();
      if (response && response.data) {
        setAppointments(response.data);
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  const removeAppointment = async (id: number) => {
    try {
      await deleteAppointment(id);
      fetchAllAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`container ${modalContent ? "blur-background" : ""}`}>
      <h2 className="">Manage users</h2>
      <div className="text-end">
        <ModalComponent
          isOpen={modalContent !== null}
          onRequestClose={closeModal}
        >
          {modalContent}
        </ModalComponent>
      </div>
      <table className="table table-striped table-bordred">
        <thead>
          <tr>
            <th>Id</th>
            <th>Patient Id</th>
            <th>Doctor Id</th>
            <th>Appointment DateTime</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patientId}</td>
              <td>{appointment.doctorId}</td>
              <td>{appointment.appointmentTime}</td>
              <td>{appointment.status}</td>
              <td>
                <ModalComponent
                  isOpen={modalContent !== null}
                  onRequestClose={closeModal}
                >
                  {modalContent}
                </ModalComponent>
                <button
                  onClick={() => removeAppointment(appointment.id)}
                  style={{ marginLeft: "10px" }}
                >
                  <span>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAppointments;
