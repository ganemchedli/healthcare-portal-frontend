import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Form,
  notification,
  Typography,
  List,
} from "antd";

import { createVitalSigns, deleteVitalSigns } from "../../services/EmrService";

const { Text } = Typography;

interface VitalSign {
  id?: number;
  bloodPressure: string;
  heartRate: string;
  respiratoryRate: string;
  temperature: string;
  height: string;
  weight: string;
  bmi: string;
}

interface VitalSignsSectionProps {
  emrId: number;
}

const VitalSignsSection: React.FC<VitalSignsSectionProps> = ({ emrId }) => {
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentVital, setCurrentVital] = useState<VitalSign | null>(null);
  const [form] = Form.useForm();

  const showModal = (vital?: VitalSign) => {
    form.setFieldsValue(
      vital || {
        bloodPressure: "",
        heartRate: "",
        respiratoryRate: "",
        temperature: "",
        height: "",
        weight: "",
        bmi: "",
      }
    );
    setCurrentVital(vital);
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values: VitalSign) => {
    try {
      const response = await createVitalSigns(emrId, values);
      if (currentVital && currentVital.id) {
        setVitalSigns(
          vitalSigns.map((v) =>
            v.id === currentVital.id ? { ...v, ...values } : v
          )
        );
      } else {
        setVitalSigns([...vitalSigns, { ...values, id: response.data.id }]);
      }
      notification.success({
        message: "Vital Signs Saved Successfully",
        description: "Your vital signs have been successfully updated.",
      });
      setIsModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Error Saving Vital Signs",
        description: "There was a problem saving the vital signs.",
      });
    }
  };

  const handleDeleteVitalSigns = async (id: number) => {
    try {
      await deleteVitalSigns(id);
      setVitalSigns(vitalSigns.filter((v) => v.id !== id));
      notification.success({ message: "Vital Signs Deleted Successfully" });
    } catch (error) {
      notification.error({
        message: "Error Deleting Vital Signs",
        description: "There was an error while deleting the vital signs.",
      });
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>
        Add Vital Signs
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={vitalSigns}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="edit" onClick={() => showModal(item)}>
                Edit
              </Button>,
              <Button
                key="delete"
                danger
                onClick={() => handleDeleteVitalSigns(item.id!)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={`Vital Signs Record`}
              description={
                <>
                  <Text>Blood Pressure: {item.bloodPressure}</Text>
                  <br />
                  <Text>Heart Rate: {item.heartRate}</Text>
                  <br />
                  <Text>Respiratory Rate: {item.respiratoryRate}</Text>
                  <br />
                  <Text>Temperature: {item.temperature}</Text>
                  <br />
                  <Text>Height: {item.height}</Text>
                  <br />
                  <Text>Weight: {item.weight}</Text>
                  <br />
                  <Text>BMI: {item.bmi}</Text>
                </>
              }
            />
          </List.Item>
        )}
      />
      <Modal
        title={currentVital ? "Edit Vital Signs" : "Add Vital Signs"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="bloodPressure"
            label="Blood Pressure"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="heartRate"
            label="Heart Rate"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="respiratoryRate"
            label="Respiratory Rate"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="temperature"
            label="Temperature"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="height" label="Height" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="weight" label="Weight" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="bmi" label="BMI" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save Vital Signs
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default VitalSignsSection;
