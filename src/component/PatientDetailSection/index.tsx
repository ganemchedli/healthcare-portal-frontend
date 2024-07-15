import React, { useState } from "react";
import { Input, Button, notification, Card } from "antd";
import { getPatientByEmail } from "../../services/EmrService"; // Ensure this function is correctly imported

import UserImage from "../UserImage";
interface PatientDetails {
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
}
interface PatientDetailProps {
  emrId: number;
}

const PatientDetailsSection: React.FC<PatientDetailProps> = ({ emrId }) => {
  const [email, setEmail] = useState<string>("");
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleRetrieveDetails = async () => {
    if (!email) {
      notification.warning({
        message: "Input Error",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setLoading(true);

    try {
      const patientData = await getPatientByEmail(email, emrId); // Ensure this function is correctly implemented
      console.log("Patient Data:", patientData);
      setPatientDetails(patientData);
      notification.success({
        message: "Patient Details Retrieved",
        description: "Patient details have been successfully retrieved.",
      });
    } catch (error) {
      notification.error({
        message: "Error Retrieving Patient Details",
        description: "There was an error retrieving the patient details.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Input
        placeholder="Enter patient email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Button
        type="primary"
        onClick={handleRetrieveDetails}
        loading={loading}
        style={{ marginBottom: 16 }}
      >
        Retrieve Details
      </Button>
      {patientDetails && (
        <Card>
          <p>
            <strong>ID:</strong> {patientDetails.id}
          </p>
          <p>
            <strong>First Name:</strong> {patientDetails.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {patientDetails.lastName}
          </p>
          <p>
            <strong>Gender:</strong> {patientDetails.gender}
          </p>
          <p>
            <strong>Email:</strong> {patientDetails.email}
          </p>

          <p>
            <strong>Address:</strong> {patientDetails.address}
          </p>
          <p>
            <strong>State:</strong> {patientDetails.state}
          </p>
          <p>
            <strong>City:</strong> {patientDetails.city}
          </p>
          <p>
            <strong>Zip Code:</strong> {patientDetails.zipCode}
          </p>
          <p>
            <strong>Role:</strong> {patientDetails.role}
          </p>
          <p>
            <strong>Birthday:</strong> {patientDetails.birthday}
          </p>
          <p>
            <strong>Phone Number:</strong> {patientDetails.phoneNumber}
          </p>
          {patientDetails.image && <UserImage userData={patientDetails} />}
        </Card>
      )}
    </div>
  );
};

export default PatientDetailsSection;
