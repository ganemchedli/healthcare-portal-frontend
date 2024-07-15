import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  Form,
  DatePicker,
  List,
  notification,
} from "antd";
import moment from "moment";

import { createMedication, deleteMedication } from "../../services/EmrService";

interface Medication {
  id?: number;
  medicationName: string;
  dosage: string;
  prescriptionDate: string;
  refillHistory: string;
  allergies: string;
  adverseReactions: string;
}

interface MedicationSectionProps {
  emrId: number;
}

const MedicationSection: React.FC<MedicationSectionProps> = ({ emrId }) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentMedication, setCurrentMedication] = useState<Medication | null>(
    null
  );
  const [form] = Form.useForm();

  // Function to toggle modal and set current medication for editing
  const showModal = (medication?: Medication) => {
    form.setFieldsValue({
      medicationName: medication?.medicationName || "",
      dosage: medication?.dosage || "",
      prescriptionDate: medication ? moment(medication.prescriptionDate) : null,
      refillHistory: medication?.refillHistory || "",
      allergies: medication?.allergies || "",
      adverseReactions: medication?.adverseReactions || "",
    });
    setCurrentMedication(medication);
    setIsModalVisible(true);
  };

  // Handle form submission for adding or updating medication
  const handleFormSubmit = async (values: any) => {
    const formattedValues = {
      ...values,
      prescriptionDate: values.prescriptionDate.format("YYYY-MM-DD"),
    };

    try {
      if (currentMedication?.id) {
        // Update logic if medication already exists
        // Assume updateMedication function is defined similarly to createMedication
        // await updateMedication(currentMedication.id, formattedValues);
      } else {
        // Create new medication
        const response = await createMedication(emrId, formattedValues);
        setMedications([
          ...medications,
          { ...formattedValues, id: response.data.id },
        ]);
      }
      notification.success({
        message: "Success",
        description: "Medication has been saved successfully.",
      });
      setIsModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an error saving the medication.",
      });
    }
  };

  // Function to delete medication
  const handleDeleteMedication = async (id: number) => {
    try {
      await deleteMedication(id);
      setMedications(medications.filter((m) => m.id !== id));
      notification.success({
        message: "Medication Deleted",
        description: "The medication has been successfully deleted.",
      });
    } catch (error) {
      notification.error({
        message: "Error Deleting",
        description: "There was an error deleting the medication.",
      });
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>
        Add Medication
      </Button>
      <List
        dataSource={medications}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="edit" onClick={() => showModal(item)}>
                Edit
              </Button>,
              <Button
                key="delete"
                danger
                onClick={() => handleDeleteMedication(item.id!)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.medicationName}
              description={`Dosage: ${item.dosage}, Prescribed on: ${item.prescriptionDate}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title={currentMedication ? "Edit Medication" : "Add Medication"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="medicationName"
            label="Medication Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="dosage" label="Dosage" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="prescriptionDate"
            label="Prescription Date"
            rules={[{ required: true }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="refillHistory" label="Refill History">
            <Input />
          </Form.Item>
          <Form.Item name="allergies" label="Allergies">
            <Input />
          </Form.Item>
          <Form.Item name="adverseReactions" label="Adverse Reactions">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default MedicationSection;
