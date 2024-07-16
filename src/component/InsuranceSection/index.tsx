import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  Form,
  notification,
  Typography,
  Divider,
} from "antd";
import {
  createInsurance,
  deleteInsurance,
  getInsuranceByEmrId,
} from "../../services/EmrService";

const { Text } = Typography;

interface Insurance {
  id?: number;
  providerName: string;
  policyNumber: string;
  billingRecord: string;
}

interface InsuranceSectionProps {
  emrId: number;
}

const InsuranceSection: React.FC<InsuranceSectionProps> = ({ emrId }) => {
  const [insurance, setInsurance] = useState<Insurance | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchInsurance = async () => {
      try {
        const response = await getInsuranceByEmrId(emrId);
        if (response.data) {
          setInsurance(response.data);
        }
      } catch (error) {
        notification.error({
          message: "Failed to Fetch Insurance",
          description: "There was an error fetching the insurance information.",
        });
      }
    };

    fetchInsurance();
  }, [emrId]);

  const showModal = () => {
    form.setFieldsValue(insurance);
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values: Insurance) => {
    try {
      const response = await createInsurance(emrId, values);
      setInsurance({ ...values, id: response.data.id }); // Assuming the response contains the ID
      notification.success({
        message: "Insurance Information Saved",
        description: "The insurance information has been successfully updated.",
      });
      setIsModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Error Saving Insurance",
        description: "There was a problem saving the insurance information.",
      });
    }
  };

  const handleDeleteInsurance = async () => {
    if (insurance?.id) {
      try {
        await deleteInsurance(insurance.id);
        setInsurance(null);
        notification.success({
          message: "Insurance Information Deleted",
          description:
            "The insurance information has been successfully deleted.",
        });
      } catch (error) {
        notification.error({
          message: "Error Deleting Insurance",
          description:
            "There was a problem deleting the insurance information.",
        });
      }
    }
  };

  return (
    <div>
      {insurance ? (
        <>
          <div>
            <Text strong>Provider Name:</Text> {insurance.providerName}
            <br />
            <Text strong>Policy Number:</Text> {insurance.policyNumber}
            <br />
            <Text strong>Billing Record:</Text> {insurance.billingRecord}
          </div>
          <Divider />
          <Button type="primary" onClick={showModal}>
            Edit Insurance
          </Button>
          <Button danger onClick={handleDeleteInsurance}>
            Delete Insurance
          </Button>
        </>
      ) : (
        <Button type="primary" onClick={showModal}>
          Add Insurance
        </Button>
      )}

      <Modal
        title={
          insurance ? "Edit Insurance Information" : "Add Insurance Information"
        }
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="providerName"
            label="Provider Name"
            rules={[
              { required: true, message: "Please input the provider name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="policyNumber"
            label="Policy Number"
            rules={[
              { required: true, message: "Please input the policy number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="billingRecord"
            label="Billing Record"
            rules={[
              { required: true, message: "Please input the billing record!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {insurance ? "Update Insurance" : "Add Insurance"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InsuranceSection;
