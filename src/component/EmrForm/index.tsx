import React, { useState, useEffect } from "react";
import { Layout, Form, Steps, Button, notification } from "antd";
import {
  FileTextOutlined,
  MedicineBoxOutlined,
  HistoryOutlined,
  HeartOutlined,
  UserOutlined,
  AuditOutlined,
  LineChartOutlined,
  ScheduleOutlined,
  ExperimentOutlined,
  MailOutlined,
} from "@ant-design/icons";
import MedicationSection from "../MedicationSection";
import ClinicalNotesSection from "../ClinicalNoteSection";
import VitalSignsSection from "../VitalSignsSection";
import MedicalHistorySection from "../MedicalHistorySection";
import SurgerySection from "../SurgerySection";
import ImmunizationSection from "../ImmunizationSection";
import InsuranceSection from "../InsuranceSection";
import LabTestSection from "../LabTestsSection";
import PlanSection from "../PlanSection";
import PatientDetailsSection from "../PatientDetailSection";

import { createEmr } from "../../services/EmrService";

const { Content, Sider } = Layout;
const { Step } = Steps;

const EmrForm: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [emr, setEmr] = useState<any>();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    const initializeEmr = async () => {
      try {
        const doctorId = localStorage.getItem("userId");
        const emrData = await createEmr(doctorId); // This function should fetch or generate EMR data
        setEmr(emrData.data);
      } catch (error) {
        console.error("Failed to create EMR:", error);
        notification.error({
          message: "Error",
          description: "Failed to initialize EMR data.",
        });
      }
    };

    initializeEmr();
  }, []); // Empty dependency array ensures this runs only once

  const handleSubmit = () => {
    notification.success({
      message: "EMR Submitted",
      description:
        "Your electronic medical record has been submitted successfully.",
    });
  };

  const steps = [
    {
      title: "Patient Details",
      icon: <MailOutlined />,
      content: <PatientDetailsSection emrId={emr?.id} />,
    },
    {
      title: "Insurance",
      icon: <LineChartOutlined />,
      content: <InsuranceSection emrId={emr?.id} />,
    },
    {
      title: "Medical History",
      icon: <HistoryOutlined />,
      content: <MedicalHistorySection emrId={emr?.id} />,
    },
    {
      title: "Clinical Notes",
      icon: <FileTextOutlined />,
      content: <ClinicalNotesSection emrId={emr?.id} />,
    },
    {
      title: "Medications",
      icon: <MedicineBoxOutlined />,
      content: <MedicationSection emrId={emr?.id} />,
    },
    {
      title: "Vital Signs",
      icon: <HeartOutlined />,
      content: <VitalSignsSection emrId={emr?.id} />,
    },

    {
      title: "Immunizations",
      icon: <UserOutlined />,
      content: <ImmunizationSection emrId={emr?.id} />,
    },
    {
      title: "Lab Tests",
      icon: <ExperimentOutlined />,
      content: <LabTestSection emrId={emr?.id} />,
    },
    {
      title: "Plans",
      icon: <ScheduleOutlined />,
      content: <PlanSection emrId={emr?.id} />,
    },
  ];

  return (
    <Layout style={{ minHeight: "80vh" }}>
      <Sider width={200} style={{ background: "#fff" }}>
        <Steps
          direction="vertical"
          current={current}
          onChange={(current) => setCurrent(current)}
        >
          {steps.map((step, index) => (
            <Step key={index} title={step.title} icon={step.icon} />
          ))}
        </Steps>
      </Sider>
      <Layout style={{ padding: "24px" }}>
        <Content
          style={{
            position: "relative",
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <Form layout="vertical">
            <h1>{steps[current].title}</h1>
            {steps[current].content}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {current > 0 && (
                <Button style={{ marginRight: 8 }} onClick={prev}>
                  Previous
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button type="primary" onClick={next}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </div>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EmrForm;
