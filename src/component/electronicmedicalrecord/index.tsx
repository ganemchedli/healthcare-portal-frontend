import React, { useEffect, useState } from "react";
import { List, Row, Col, Card, Button, Table, TableProps, Empty } from "antd";
import UserImage from "../UserImage";

import "./index.css";
import {
  getPatientById,
  getAllVitalSignsByEmrId,
  getAllLabTestsByEmrId,
  getAllMedicationByEmrId,
  getAllImmunizationByEmrId,
  getAllClinicalNotesByEmrId,
  getMedicalHistoryByEmrId,
  getInsuranceByEmrId,
  getAllPlanByEmrId,
} from "../../services/EmrService";

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
  allergies: string;
  refillHistory: string;
  adverseReactions: string;
}

interface Immunization {
  vaccinationName: string;
  adminsitrationDate: string;
  reaction: string;
}

interface ClinicalNote {
  noteDate: string;
  providerName: string;
  assessment: string;
  diagnosis: string;
}

interface MedicalHistory {
  pastCondition: string;
  chronicIllness: string;
  surgicalHistory: string;
  familyMedicalHistory: string;
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
    dataIndex: "allergies",
    key: "allergy",
    width: "20%",
  },
  {
    title: "Adverse Reaction",
    dataIndex: "adverseReactions",
    key: "adverseReaction",
    width: "20%",
  },
];

const immunizationColumns: TableProps<Immunization>["columns"] = [
  {
    title: "Vaccine Name",
    dataIndex: "vaccinationName",
    key: "vaccineName",
    width: "30%",
  },
  {
    title: "Administration Date",
    dataIndex: "adminsitrationDate",
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
    title: "Past Condition",
    dataIndex: "pastCondition",
    key: "pastConditions",
    width: "25%",
  },
  {
    title: "Chronic Illness",
    dataIndex: "chronicIllness",
    key: "chronicIllnesses",
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

interface ElectronicMedicalRecordProps {
  patientId: number; // Assuming you might load data based on a patient ID
}

const ElectronicMedicalRecord: React.FC<ElectronicMedicalRecordProps> = ({
  patientId,
}) => {
  const [patientData, setPatientData] = useState<any>(null);
  const [vitalSigns, setVitalSigns] = useState<VitalSigns | null>(null);
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [immunizations, setImmunizations] = useState<Immunization[]>([]);
  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([]);
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory | null>(
    null
  );
  const [insurance, setInsurance] = useState<Insurance | null>(null);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [patientId]);
  //fetch patient data by email
  const fetchData = async () => {
    try {
      // Fetch patient data
      const patientResponse = await getPatientById(patientId);
      if (patientResponse.data) {
        setPatientData(patientResponse.data);
        // Fetch other data only if emrId is available
        const emrId = patientResponse.data.electronicMedicalRecordId;
        const [
          vitalSignsResponse,
          labTestsResponse,
          medicationsResponse,
          immunizationsResponse,
          clinicalNotesResponse,
          medicalHistoryResponse,
          insuranceResponse,
          planResponse,
        ] = await Promise.all([
          getAllVitalSignsByEmrId(emrId),
          getAllLabTestsByEmrId(emrId),
          getAllMedicationByEmrId(emrId),
          getAllImmunizationByEmrId(emrId),
          getAllClinicalNotesByEmrId(emrId),
          getMedicalHistoryByEmrId(emrId),
          getInsuranceByEmrId(emrId),
          getAllPlanByEmrId(emrId),
        ]);

        setVitalSigns(vitalSignsResponse.data);
        setLabTests(labTestsResponse.data);
        setMedications(medicationsResponse.data);
        setImmunizations(immunizationsResponse.data);
        setClinicalNotes(clinicalNotesResponse.data);
        setMedicalHistory(medicalHistoryResponse.data);
        setInsurance(insuranceResponse.data);
        setProcedures(planResponse.data);
      } else {
        console.error("EMR ID is missing from the patient data");
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Render blank component if patientData is null
  if (!patientData) {
    return <Empty description="No patient data available" />;
  }

  return (
    <>
      <div>
        <Card className="mb-3">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
              {/* {patientData.image ? (
                <UserImage userData={patientData} />
              ) : (
                <img src="https://via.placeholder.com/150" alt="User" />
              )} */}
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="mb-2">
                <span className="fw-bold">Name :</span> {patientData.firstName}{" "}
              </div>
              <div className="mb-2">
                <span className="fw-bold">Gender :</span> {patientData.gender}
              </div>
              <div className="mb-2">
                <span className="fw-bold"> Age :</span> {patientData.birthday}
              </div>
              <div>
                <p className="fw-bold">Insurance details :</p>
                {insurance?.providerName} - {insurance?.policyNumber}
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="mb-2">
                {" "}
                <span className="fw-bold">Weight :</span> {vitalSigns?.weight}{" "}
                kg
              </div>
              <div className="mb-2">
                <span className="fw-bold">Height :</span> {vitalSigns?.height}{" "}
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
                    {vitalSigns?.bloodPressure} per min (Normal range 60 - 100
                    per min)
                  </p>
                </Col>
                <Col>
                  <p>
                    <span className="fw-bold ">Heart Rate:</span> <br />
                    {vitalSigns?.heartRate} per min (Normal range 12 - 20 per
                    min)
                  </p>
                </Col>
              </Row>
              <Row gutter={675}>
                <Col>
                  {" "}
                  <p>
                    <span className="fw-bold">Respiratory rate :</span> <br />
                    {vitalSigns?.respiratoryRate} per min (Normal range : 12 -
                    20 min)
                  </p>
                </Col>
                <Col>
                  <p>
                    <span className="fw-bold">Temperature :</span> <br />
                    {vitalSigns?.temperature} °C (Normal range : 36.5 °C - 37.5
                    °C){" "}
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
              <Table columns={labTestColumns} dataSource={labTests}></Table>
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
              <Table columns={medicationColumns} dataSource={medications} />
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
                dataSource={immunizations}
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
                dataSource={clinicalNotes}
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
                dataSource={[medicalHistory]}
              ></Table>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ElectronicMedicalRecord;
