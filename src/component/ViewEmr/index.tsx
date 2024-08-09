import React, { useState } from "react";
import { Modal, Button, Input, Form } from "antd";
import ElectronicMedicalRecord from "../Electronicmedicalrecord";

const ViewEmr: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [inputEmail, setInputEmail] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };

  const handleSubmit = () => {
    setEmail(inputEmail);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEmail(null);
    setInputEmail("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form.Item
          label="Enter your patient email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            type="email"
            value={inputEmail}
            onChange={handleChange}
            placeholder="Enter your patient email"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Electronic Medical Record"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {email && <ElectronicMedicalRecord patientEmail={email} />}
      </Modal>
    </div>
  );
};

export default ViewEmr;
