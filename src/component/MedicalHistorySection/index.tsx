import React, { useState } from "react";
import { Button, Input, Modal, Form, notification, Typography } from "antd";

import {
  createMedicalHistory,
  deleteMedicalHistory,
} from "../../services/EmrService";

const { Text } = Typography;

interface MedicalHistory {
  id?: number;
  pastCondition: string;
  chronicIllness: string;
  familyMedicalHistory: string;
}

interface MedicalHistorySectionProps {
  emrId: number;
}

const MedicalHistorySection: React.FC<MedicalHistorySectionProps> = ({
  emrId,
}) => {
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue(medicalHistory);
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values: MedicalHistory) => {
    try {
      const response = await createMedicalHistory(emrId, values);
      setMedicalHistory({ ...values, id: response.data.id }); // Assuming the response contains the ID
      notification.success({
        message: "Medical History Saved",
        description: "Your medical history has been successfully updated.",
      });
      setIsModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Error Saving Medical History",
        description: "There was a problem saving the medical history.",
      });
    }
  };

  const handleDeleteMedicalHistory = async () => {
    if (medicalHistory?.id) {
      try {
        await deleteMedicalHistory(medicalHistory.id);
        setMedicalHistory(null);
        notification.success({
          message: "Medical History Deleted",
          description: "The medical history has been successfully deleted.",
        });
      } catch (error) {
        notification.error({
          message: "Error Deleting Medical History",
          description: "There was a problem deleting the medical history.",
        });
      }
    }
  };

  return (
    <div>
      {medicalHistory ? (
        <>
          <div>
            <Text strong>Past Condition:</Text> {medicalHistory.pastCondition}
            <br />
            <Text strong>Chronic Illness:</Text> {medicalHistory.chronicIllness}
            <br />
            <Text strong>Family Medical History:</Text>{" "}
            {medicalHistory.familyMedicalHistory}
          </div>
          <Button type="primary" onClick={showModal}>
            Edit Medical History
          </Button>
          <Button danger onClick={handleDeleteMedicalHistory}>
            Delete Medical History
          </Button>
        </>
      ) : (
        <Button type="primary" onClick={showModal}>
          Add Medical History
        </Button>
      )}

      <Modal
        title={medicalHistory ? "Edit Medical History" : "Add Medical History"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="pastCondition"
            label="Past Condition"
            rules={[
              { required: true, message: "Please enter the past condition!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="chronicIllness"
            label="Chronic Illness"
            rules={[
              { required: true, message: "Please enter the chronic illness!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="familyMedicalHistory"
            label="Family Medical History"
            rules={[
              {
                required: true,
                message: "Please enter the family medical history!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {medicalHistory
                ? "Update Medical History"
                : "Add Medical History"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MedicalHistorySection;
