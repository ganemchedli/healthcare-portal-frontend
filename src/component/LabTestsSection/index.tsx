import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Form,
  notification,
  List,
} from "antd";
import moment from "moment";

import { createLabTest, deleteLabTest } from "../../services/EmrService";

interface LabTest {
  id?: number;
  testName: string;
  testDate: string;
  results: string;
}

interface LabTestsSectionProps {
  emrId: number;
}

const LabTestsSection: React.FC<LabTestsSectionProps> = ({ emrId }) => {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLabTest, setCurrentLabTest] = useState<LabTest | null>(null);
  const [form] = Form.useForm();

  const showModal = (labTest?: LabTest) => {
    form.setFieldsValue(
      labTest || { testName: "", testDate: null, results: "" }
    );
    setCurrentLabTest(labTest);
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values: LabTest) => {
    try {
      const response = await createLabTest(emrId, values);
      if (currentLabTest && currentLabTest.id) {
        setLabTests(
          labTests.map((lt) =>
            lt.id === currentLabTest.id ? { ...lt, ...values } : lt
          )
        );
      } else {
        setLabTests([...labTests, { ...values, id: response.data.id }]);
      }
      notification.success({
        message: "Lab Test Saved Successfully",
        description: "The lab test has been successfully updated.",
      });
      setIsModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Error Saving Lab Test",
        description: "There was a problem saving the lab test.",
      });
    }
  };

  const handleDeleteLabTest = async (id: number) => {
    try {
      await deleteLabTest(id);
      setLabTests(labTests.filter((lt) => lt.id !== id));
      notification.success({ message: "Lab Test Deleted Successfully" });
    } catch (error) {
      notification.error({
        message: "Error Deleting Lab Test",
        description: "There was an error while deleting the lab test.",
      });
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>
        Add Lab Test
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={labTests}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="edit" onClick={() => showModal(item)}>
                Edit
              </Button>,
              <Button
                key="delete"
                danger
                onClick={() => handleDeleteLabTest(item.id!)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={`Lab Test: ${item.testName}`}
              description={`Date: ${item.testDate} | Results: ${item.results}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title={currentLabTest ? "Edit Lab Test" : "Add Lab Test"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="testName"
            label="Test Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="testDate"
            label="Test Date"
            rules={[{ required: true }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="results"
            label="Results"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save Lab Test
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default LabTestsSection;
