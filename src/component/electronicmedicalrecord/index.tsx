import React from "react";
import {
  Collapse,
  List,
  Typography,
  Row,
  Col,
  Card,
  Avatar,
  Button,
  Table,
  Space,
  Tag,
  TableProps,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./index.css";

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

const medicationColumns: TableProps<Medication>["columns"] = [
  {
    title: "Prescription Date",
    dataIndex: "prescriptionDate",
    key: "prescriptionDate",
    width: "20%",
  },
  {
    title: "Medication Name",
    dataIndex: "medicationName",
    key: "medicationName",
    width: "20%",
  },
  {
    title: "Dosage",
    dataIndex: "dosage",
    key: "dosage",
    width: "20%",
  },
  {
    title: "Allergy",
    dataIndex: "allergy",
    key: "allergy",
    width: "20%",
  },
  {
    title: "Adverse Reaction",
    dataIndex: "adverseReaction",
    key: "adverseReaction",
    width: "20%",
  },
];

const immunizationColumns: TableProps<Immunization>["columns"] = [
  {
    title: "Vaccine Name",
    dataIndex: "vaccineName",
    key: "vaccineName",
    width: "30%",
  },
  {
    title: "Administration Date",
    dataIndex: "administrationDate",
    key: "administrationDate",
    width: "30%",
  },
  {
    title: "Reaction",
    dataIndex: "reaction",
    key: "reaction",
    width: "30%",
  },
];

const clinicalNotesColumns: TableProps<ClinicalNote>["columns"] = [
  {
    title: "Note date",
    dataIndex: "noteDate",
    key: "noteDate",
    width: "30%",
  },
  {
    title: "Provider name",
    dataIndex: "providerName",
    key: "providerName",
    width: "30%",
  },
  {
    title: "Assessment",
    dataIndex: "assessment",
    key: "assessment",
    width: "30%",
  },
  {
    title: "Diagnosis",
    dataIndex: "diagnosis",
    key: "diagnosis",
    width: "30%",
  },
];

const medicalHistoryColumns: TableProps<MedicalHistory>["columns"] = [
  {
    title: "Past Conditions",
    dataIndex: "pastConditions",
    key: "pastConditions",
    width: "25%",
  },
  {
    title: "Chronic Illnesses",
    dataIndex: "chronicIllnesses",
    key: "chronicIllnesses",
    width: "25%",
  },
  {
    title: "Surgical History",
    dataIndex: "surgicalHistory",
    key: "surgicalHistory",
    width: "25%",
  },
  {
    title: "Family Medical History",
    dataIndex: "familyMedicalHistory",
    key: "familyMedicalHistory",
    width: "25%",
  },
];

const labTestColumns: TableProps<LabTest>["columns"] = [
  {
    title: "Test Name",
    dataIndex: "testName",
    key: "testName",
    width: "30%",
  },
  {
    title: "Test Date",
    dataIndex: "testDate",
    key: "testDate",
    width: "30%",
  },
  {
    title: "Results",
    dataIndex: "results",
    key: "results",
    width: "30%",
  },
];
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
    <>
      <div>
        <Card className="mb-3">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
              <Avatar size={150} src={"src/assets/photo.jpg"} />
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="mb-2">
                <span className="fw-bold">Name :</span> Foulen ben Foulen
              </div>
              <div className="mb-2">
                <span className="fw-bold">Gender :</span> Male
              </div>
              <div className="mb-2">
                <span className="fw-bold"> Age :</span> 25
              </div>
              <div>
                <p className="fw-bold">Insurance details :</p>
                {data.insurance.providerName} - {data.insurance.policyNumber}
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="mb-2">
                {" "}
                <span className="fw-bold">Weight :</span> 90 kg
              </div>
              <div className="mb-2">
                <span className="fw-bold">Height :</span> 190 cm
              </div>
              <div>
                <span className="fw-bold">Marital status :</span> Single
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <Row className="mb-3">
                <Button>Go back to Dashboard</Button>
              </Row>
              <Row>
                <Button>Close Profile</Button>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
      <div>
        <Card className="mb-3">
          <Row>
            <Button className="me-3">
              Vital signs <PlusCircleOutlined />
            </Button>
            <Button className="me-3">
              Medication <PlusCircleOutlined />
            </Button>
            <Button className="me-3">
              Medical History <PlusCircleOutlined />
            </Button>
            <Button className="me-3">
              Clinical note <PlusCircleOutlined />
            </Button>
            <Button className="me-3">
              Patient information <PlusCircleOutlined />
            </Button>
          </Row>
        </Card>
      </div>
      <div>
        <Row>
          <Col>
            <Card
              title="Vital Signs"
              bordered={true}
              className="mb-4"
              extra={<p>Documented on : 21-07-2023</p>}
            >
              <Row gutter={625}>
                <Col>
                  <p>
                    <span className="fw-bold">Blood Pressure:</span> <br />
                    {data.vitalSigns.bloodPressure} per min (Normal range 60 -
                    100 per min)
                  </p>
                </Col>
                <Col>
                  <p>
                    <span className="fw-bold ">Heart Rate:</span> <br />
                    {data.vitalSigns.heartRate} per min (Normal range 12 - 20
                    per min)
                  </p>
                </Col>
              </Row>
              <Row gutter={675}>
                <Col>
                  {" "}
                  <p>
                    <span className="fw-bold">Respiratory rate :</span> <br />
                    {data.vitalSigns.respiratoryRate} per min (Normal range : 12
                    - 20 min)
                  </p>
                </Col>
                <Col>
                  <p>
                    <span className="fw-bold">Temperature :</span> <br />
                    {data.vitalSigns.temperature} °C (Normal range : 36.5 °C -
                    37.5 °C){" "}
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Card
              className="resizable-card-labtest"
              title="Lab Tests"
              bordered={true}
            >
              <Table
                columns={labTestColumns}
                dataSource={data.labTests}
              ></Table>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Card
              className="resizable-card-medication"
              title="Medication"
              bordered={true}
            >
              <Table
                columns={medicationColumns}
                dataSource={data.medications}
              />
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Card
              className="resizable-card-immunization"
              title="Immunizations"
              bordered={true}
            >
              <Table
                columns={immunizationColumns}
                dataSource={data.immunizations}
              ></Table>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Card
              className="resizable-card-clinicalnotes"
              title="Clinical Notes"
              bordered={true}
            >
              <Table
                columns={clinicalNotesColumns}
                dataSource={data.clinicalNotes}
              ></Table>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Card
              className="resizable-card-medicalhistory"
              title="Medical History"
              bordered={true}
            >
              <Table
                columns={medicalHistoryColumns}
                dataSource={[data.medicalHistory]}
              ></Table>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ElectronicMedicalRecord;
