import React from "react";
import { Collapse, List, Typography } from "antd";
const { Panel } = Collapse;
const { Title, Text } = Typography;

interface VitalSigns {
  bloodPressure: string;
  heartRate: number;
  respiratoryRate: number;
  temperature: number;
  height: number;
  weight: number;
  bmi: number;
}

interface LabTest {
  testName: string;
  testDate: string;
  results: string;
}

interface Medication {
  medicationName: string;
  dosage: string;
  prescriptionDate: string;
  allergy: boolean;
  adverseReaction: string;
}

interface Immunization {
  vaccineName: string;
  administrationDate: string;
  reaction: string;
}

interface ClinicalNote {
  noteDate: string;
  providerName: string;
  assessment: string;
  diagnosis: string;
}

interface MedicalHistory {
  pastConditions: string[];
  chronicIllnesses: string[];
  surgicalHistory: string[];
  familyMedicalHistory: string[];
}

interface Insurance {
  providerName: string;
  policyNumber: string;
}

interface Procedure {
  procedureName: string;
  procedureDate: string;
  outcome: string;
  anesthesiaRecords: string;
}

interface ElectronicMedicalRecordProps {
  patientId: string; // Assuming you might load data based on a patient ID
}

const ElectronicMedicalRecord: React.FC<ElectronicMedicalRecordProps> = ({
  patientId,
}) => {
  // Dummy data loading mechanism
  const data = {
    vitalSigns: {
      bloodPressure: "120/80",
      heartRate: 72,
      respiratoryRate: 18,
      temperature: 98.6,
      height: 175,
      weight: 70,
      bmi: 22.9,
    },
    labTests: [
      { testName: "CBC", testDate: "2024-01-01", results: "Normal" },
      {
        testName: "Lipid Profile",
        testDate: "2024-01-02",
        results: "High cholesterol",
      },
    ],
    medications: [
      {
        medicationName: "Amoxicillin",
        dosage: "500mg",
        prescriptionDate: "2024-01-01",
        allergy: false,
        adverseReaction: "Nausea",
      },
    ],
    immunizations: [
      {
        vaccineName: "Influenza",
        administrationDate: "2023-12-01",
        reaction: "None",
      },
    ],
    clinicalNotes: [
      {
        noteDate: "2024-01-01",
        providerName: "Dr. Smith",
        assessment: "Stable",
        diagnosis: "Influenza",
      },
    ],
    medicalHistory: {
      pastConditions: ["Asthma"],
      chronicIllnesses: ["Diabetes"],
      surgicalHistory: ["Appendectomy"],
      familyMedicalHistory: ["Heart Disease"],
    },
    insurance: { providerName: "United Health", policyNumber: "123456" },
    procedures: [
      {
        procedureName: "Knee Surgery",
        procedureDate: "2023-11-01",
        outcome: "Successful",
        anesthesiaRecords: "Local anesthesia",
      },
    ],
  };

  // Render Function
  const renderListItems = (
    items: any[],
    renderItem: (item: any) => JSX.Element
  ) => <List dataSource={items} renderItem={renderItem} />;

  return (
    <Collapse
      defaultActiveKey={["1", "2", "3", "4", "5", "6", "7", "8"]}
      accordion
    >
      <Panel header="Vital Signs" key="1">
        <p>Blood Pressure: {data.vitalSigns.bloodPressure}</p>
        <p>Heart Rate: {data.vitalSigns.heartRate}</p>
        {/* Add other vital signs */}
      </Panel>
      <Panel header="Lab Tests" key="2">
        {renderListItems(data.labTests, (item) => (
          <List.Item>
            <Text>
              {item.testName}: {item.results} on {item.testDate}
            </Text>
          </List.Item>
        ))}
      </Panel>
      {/* Additional panels for Medications, Immunizations, etc. */}
    </Collapse>
  );
};

export default ElectronicMedicalRecord;
