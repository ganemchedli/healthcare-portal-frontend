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

import {
  createClinicalNote,
  deleteClinicalNote,
} from "../../services/EmrService";

interface ClinicalNote {
  id?: number;
  noteDate: string;
  providerName: string;
  assessment: string;
  diagnosis: string;
}

interface ClinicalNotesSectionProps {
  emrId: number;
}

const ClinicalNotesSection: React.FC<ClinicalNotesSectionProps> = ({
  emrId,
}) => {
  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState<ClinicalNote | null>(null);
  const [form] = Form.useForm();

  const handleAddNote = () => {
    setCurrentNote(null);
    showModal();
  };

  const showModal = (note?: ClinicalNote) => {
    form.setFieldsValue(
      note
        ? {
            noteDate: note.noteDate ? moment(note.noteDate) : null,
            providerName: note.providerName,
            assessment: note.assessment,
            diagnosis: note.diagnosis,
          }
        : {
            noteDate: null,
            providerName: "",
            assessment: "",
            diagnosis: "",
          }
    );
    setCurrentNote(note);
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values: any) => {
    const formattedValues = {
      ...values,
      noteDate: values.noteDate.format("YYYY-MM-DD"),
    };

    try {
      let response;
      if (currentNote?.id) {
        // Assuming updateClinicalNote function exists
        // response = await updateClinicalNote(currentNote.id, formattedValues);
      } else {
        response = await createClinicalNote(emrId, formattedValues);
        formattedValues.id = response.data.id; // Assuming the new ID is in the response
      }

      if (currentNote?.id) {
        setClinicalNotes(
          clinicalNotes.map((note) =>
            note.id === currentNote.id ? { ...note, ...formattedValues } : note
          )
        );
      } else {
        setClinicalNotes([...clinicalNotes, formattedValues]);
      }

      notification.success({
        message: "Success",
        description: "Clinical note has been successfully saved.",
      });
      setIsModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an error while saving the clinical note.",
      });
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await deleteClinicalNote(id);
      setClinicalNotes(clinicalNotes.filter((note) => note.id !== id));
      notification.success({ message: "Clinical Note deleted successfully" });
    } catch (error) {
      notification.error({
        message: "Error Deleting Clinical Note",
        description: "There was an error while deleting the clinical note.",
      });
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddNote}>
        Add Clinical Note
      </Button>
      <List
        dataSource={clinicalNotes}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="edit" onClick={() => showModal(item)}>
                Edit
              </Button>,
              <Button
                key="delete"
                danger
                onClick={() => handleDeleteNote(item.id!)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={`Note Date: ${item.noteDate}`}
              description={`Provider: ${item.providerName}, Diagnosis: ${item.diagnosis}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title={currentNote ? "Edit Clinical Note" : "Add Clinical Note"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="noteDate"
            label="Note Date"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="providerName"
            label="Provider Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="assessment"
            label="Assessment"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="diagnosis"
            label="Diagnosis"
            rules={[{ required: true }]}
          >
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

export default ClinicalNotesSection;
