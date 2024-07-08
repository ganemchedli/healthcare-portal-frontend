import React, { useState, useEffect } from "react";
import { List, Button, Radio, RadioChangeEvent, Avatar } from "antd";
import moment from "moment"; // Using moment.js for date manipulation

interface Appointment {
  id: number;
  patientName: string;
  date: string; // ISO string format
  status: "Completed" | "Pending";
}

interface AppointmentsProps {
  // Define any props here if needed
}

const Appointments: React.FC<AppointmentsProps> = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [filter, setFilter] = useState<"All" | "Completed" | "Pending">("All");

  useEffect(() => {
    // Simulate fetching data
    const fetchedAppointments: Appointment[] = [
      {
        id: 1,
        patientName: "John Doe",
        date: "2024-07-15T14:00:00Z",
        status: "Pending",
      },
      {
        id: 2,
        patientName: "Jane Smith",
        date: "2024-07-08T09:00:00Z",
        status: "Completed",
      },
      {
        id: 3,
        patientName: "Alice Johnson",
        date: "2024-07-09T16:00:00Z",
        status: "Pending",
      },
    ];
    setAppointments(
      fetchedAppointments.sort((a, b) => moment(a.date).diff(moment(b.date)))
    );
  }, []);

  useEffect(() => {
    setFilteredAppointments(
      appointments.filter(
        (appointment) => filter === "All" || appointment.status === filter
      )
    );
  }, [appointments, filter]);

  const handleFilterChange = (e: RadioChangeEvent) => {
    setFilter(e.target.value);
  };

  const handleFinishAppointment = (id: number) => {
    console.log("Finishing appointment with ID:", id);
    // Here you would typically update the appointment status via API
  };

  const handlePostponeAppointment = (id: number) => {
    console.log("Postponing appointment with ID:", id);
    // Here you would typically handle postponing logic
  };

  return (
    <div>
      <Radio.Group
        onChange={handleFilterChange}
        value={filter}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value="All">All</Radio.Button>
        <Radio.Button value="Completed">Completed</Radio.Button>
        <Radio.Button value="Pending">Pending</Radio.Button>
      </Radio.Group>
      <List
        itemLayout="horizontal"
        dataSource={filteredAppointments}
        renderItem={(appointment) => (
          <List.Item
            actions={[
              <Button
                key="finish"
                type="primary"
                onClick={() => handleFinishAppointment(appointment.id)}
              >
                Finish
              </Button>,
              <Button
                key="postpone"
                onClick={() => handlePostponeAppointment(appointment.id)}
              >
                Postpone
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  size={60}
                  src={`https://i.pravatar.cc/150?img=${appointment.id}`}
                />
              }
              title={`Appointment with ${appointment.patientName}`}
              description={`Date: ${moment(appointment.date).format(
                "MMMM Do YYYY, h:mm a"
              )} - Status: ${appointment.status}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Appointments;
