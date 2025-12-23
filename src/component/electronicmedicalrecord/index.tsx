import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, TableProps, Empty } from "antd";
import UserImage from "../UserImage";

import "./index.css";
import {
  getAllVitalSignsByEmrId,
  getAllLabTestsByEmrId,
  getAllMedicationByEmrId,
  getAllImmunizationByEmrId,
  getAllClinicalNotesByEmrId,
  getMedicalHistoryByEmrId,
  getInsuranceByEmrId,
  getAllPlanByEmrId,
  getPatientByEmailOnly,
} from "../../services/EmrService";

interface VitalSigns {
  date: string;
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

const medicationColumns: TableProps<Medication>["columns"] = [
  {
    title: "Prescription Date",
    dataIndex: "prescriptionDate",
    key: "prescriptionDate",
    width: "20em",
  },
  {
    title: "Medication Name",
    dataIndex: "medicationName",
    key: "medicationName",
    width: "20em",
  },
  {
    title: "Dosage",
    dataIndex: "dosage",
    key: "dosage",
    width: "20em",
  },
  {
    title: "Allergy",
    dataIndex: "allergies",
    key: "allergy",
    width: "20em",
  },
  {
    title: "Adverse Reaction",
    dataIndex: "adverseReactions",
    key: "adverseReaction",
    width: "20em",
  },
];

const immunizationColumns: TableProps<Immunization>["columns"] = [
  {
    title: "Vaccine Name",
    dataIndex: "vaccinationName",
    key: "vaccineName",
    width: "20em",
  },
  {
    title: "Administration Date",
    dataIndex: "adminsitrationDate",
    key: "administrationDate",
    width: "20em",
  },
  {
    title: "Reaction",
    dataIndex: "reaction",
    key: "reaction",
    width: "20em",
  },
];

const clinicalNotesColumns: TableProps<ClinicalNote>["columns"] = [
  {
    title: "Note date",
    dataIndex: "noteDate",
    key: "noteDate",
    width: "20em",
  },
  {
    title: "Provider name",
    dataIndex: "providerName",
    key: "providerName",
    width: "20em",
  },
  {
    title: "Assessment",
    dataIndex: "assessment",
    key: "assessment",
    width: "20em",
  },
  {
    title: "Diagnosis",
    dataIndex: "diagnosis",
    key: "diagnosis",
    width: "20em",
  },
];

const medicalHistoryColumns: TableProps<MedicalHistory>["columns"] = [
  {
    title: "Past Condition",
    dataIndex: "pastCondition",
    key: "pastConditions",
    width: "20em",
  },
  {
    title: "Chronic Illness",
    dataIndex: "chronicIllness",
    key: "chronicIllnesses",
    width: "20em",
  },
  {
    title: "Family Medical History",
    dataIndex: "familyMedicalHistory",
    key: "familyMedicalHistory",
    width: "20em",
  },
];

const labTestColumns: TableProps<LabTest>["columns"] = [
  {
    title: "Test Name",
    dataIndex: "testName",
    key: "testName",
    width: "20em",
  },
  {
    title: "Test Date",
    dataIndex: "testDate",
    key: "testDate",
    width: "20em",
  },
  {
    title: "Results",
    dataIndex: "results",
    key: "results",
    width: "20em",
  },
];

interface ElectronicMedicalRecordProps {
  patientEmail: String; // Assuming you might load data based on a patient ID
}

const ElectronicMedicalRecord: React.FC<ElectronicMedicalRecordProps> = ({
  patientEmail,
}) => {
  const [patientData, setPatientData] = useState<Patient>();
  const [vitalSigns, setVitalSigns] = useState<VitalSigns[]>([]);
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [immunizations, setImmunizations] = useState<Immunization[]>([]);
  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([]);
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory | null>(
    null
  );
  const [insurance, setInsurance] = useState<Insurance | null>(null);
  const [procedures, setProcedures] = useState<Procedure[]>([]);

  useEffect(() => {
    fetchData();
    console.log("Labtest", labTests);
    console.log("Medications", medications);
    console.log(
      "Vital signs",
      vitalSigns.map((v) => v.bloodPressure)
    );
  }, [patientEmail]);

  const fetchData = async () => {
    try {
      // Fetch patient data
      const patientResponse = await getPatientByEmailOnly(patientEmail);

      if (patientResponse) {
        setPatientData(patientResponse);
        // Fetch other data only if emrId is available
        const emrId = patientResponse.electronicMedicalRecordId;
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
              {patientData && <UserImage userData={patientData} />}
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
            </Col>
            <Col className="gutter-row" span={6}>
              <div className="mb-2">
                {" "}
                <span className="fw-bold">Weight :</span>{" "}
                {vitalSigns.map((v) => v.weight)} kg
              </div>
              <div className="mb-2">
                <span className="fw-bold">Height :</span>{" "}
                {vitalSigns.map((v) => v.height)}{" "}
              </div>
              <div>
                <span className="fw-bold">Marital status :</span> Single
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <Row>
                <div>
                  <p className="fw-bold">Insurance details :</p>
                  {insurance?.providerName} - {insurance?.policyNumber}
                </div>
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
              extra={<p>{}</p>}
            >
              <Row justify="space-between" gutter={270}>
                <Col span={12}>
                  <p>
                    <span className="fw-bold">Blood Pressure:</span> <br />
                    {vitalSigns
                      ? `${vitalSigns.map(
                          (v) => v.bloodPressure
                        )} per min (Normal range 60 -`
                      : "N/A"}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <span className="fw-bold ">Heart Rate:</span> <br />
                    {vitalSigns
                      ? `${vitalSigns.map(
                          (v) => v.heartRate
                        )} per min (Normal range 12 - 20 per
                    min)`
                      : "N/A"}
                  </p>
                </Col>
              </Row>
              <Row justify="space-between" gutter={270}>
                <Col span={12}>
                  {" "}
                  <p>
                    <span className="fw-bold">Respiratory rate :</span> <br />
                    {vitalSigns
                      ? `${vitalSigns?.map(
                          (v) => v.respiratoryRate
                        )}  per min (Normal range : 12
                    - 20 min)`
                      : "N/A"}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <span className="fw-bold">Temperature :</span> <br />
                    {vitalSigns
                      ? `${vitalSigns.map(
                          (v) => v.temperature
                        )}  (Normal range : 36.5 °C -
                    37.5 °C)`
                      : "N/A"}{" "}
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
