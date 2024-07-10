// DataModal.tsx
import React from "react";
import { Modal, Form, Input } from "antd";

interface DataModalProps {
  isVisible: boolean;
  handleCancel: () => void;
  contentType: string;
}

const VitalsignsModal: React.FC<DataModalProps> = ({
  isVisible,
  handleCancel,
  contentType,
}) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const DataForm = () => (
    <Form {...formItemLayout}>
      <Form.Item label="Name">
        <Input placeholder="Enter name" />
      </Form.Item>
      <Form.Item label="Description">
        <Input placeholder="Enter description" />
      </Form.Item>
      {/* Add other fields as necessary */}
    </Form>
  );

  return (
    <Modal
      title={`Add ${contentType}`}
      visible={isVisible}
      onCancel={handleCancel}
      footer={null} // Remove default buttons
    >
      <DataForm />
    </Modal>
  );
};

export default VitalsignsModal;
