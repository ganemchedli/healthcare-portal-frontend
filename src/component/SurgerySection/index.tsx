import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  List,
  Modal,
  Form,
  Space,
  notification,
} from "antd";
import moment from "moment";
import { createSurgery, deleteSurgery } from "../../services/EmrService";

interface Surgery {
  id?: number;
  surgeryDate: string;
  type: string;
  doctorName: string;
  note: string;
}

interface SurgerySectionProps {
  emrId: number;
}

const SurgerySection: React.FC<SurgerySectionProps> = ({ emrId }) => {
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSurgery, setCurrentSurgery] = useState<Surgery | null>(null);
  const [form] = Form.useForm();

  const handleAddSurgery = () => {
    setCurrentSurgery(null);
    showModal();
  };

  const showModal = (surgery?: Surgery) => {
    form.setFieldsValue(
      surgery
        ? {
            surgeryDate: surgery.surgeryDate
              ? moment(surgery.surgeryDate, "YYYY-MM-DD")
              : null,
            type: surgery.type,
            doctorName: surgery.doctorName,
            note: surgery.note,
          }
        : {
            surgeryDate: null,
            type: "",
            doctorName: "",
            note: "",
          }
    );
    setCurrentSurgery(surgery);
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values: any) => {
    const formattedValues = {
      ...values,
      surgeryDate: values.surgeryDate.format("YYYY-MM-DD"),
    };

    try {
      let response;
      if (currentSurgery?.id) {
        // Assuming updateSurgery function exists
        // response = await updateSurgery(currentSurgery.id, formattedValues);
      } else {
        response = await createSurgery(emrId, formattedValues);
        formattedValues.id = response.data.id; // Assuming the new ID is in the response
      }

      if (currentSurgery?.id) {
        setSurgeries(
          surgeries.map((surgery) =>
            surgery.id === currentSurgery.id
              ? { ...surgery, ...formattedValues }
              : surgery
          )
        );
      } else {
        setSurgeries([...surgeries, formattedValues]);
      }

      notification.success({
        message: "Success",
        description: "Surgery has been successfully saved.",
      });
      setIsModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an error while saving the surgery.",
      });
    }
  };

  const handleDeleteSurgery = async (id: number) => {
    try {
      await deleteSurgery(id);
      setSurgeries(surgeries.filter((surgery) => surgery.id !== id));
      notification.success({ message: "Surgery deleted successfully" });
    } catch (error) {
      notification.error({
        message: "Error deleting surgery",
        description: "There was an error while deleting the surgery.",
      });
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddSurgery}>
        Add Surgery
      </Button>
      <List
        dataSource={surgeries}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="edit" onClick={() => showModal(item)}>
                Edit
              </Button>,
              <Button
                key="delete"
                danger
                onClick={() => handleDeleteSurgery(item.id!)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={`Surgery Date: ${item.surgeryDate}`}
              description={`Type: ${item.type}, Doctor: ${item.doctorName}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title={currentSurgery ? "Edit Surgery" : "Add Surgery"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="surgeryDate"
            label="Surgery Date"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type of Surgery"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="doctorName"
            label="Doctor Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="note" label="Notes">
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default SurgerySection;
