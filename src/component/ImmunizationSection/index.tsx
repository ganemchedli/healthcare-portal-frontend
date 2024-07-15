// import React, { useState } from "react";
// import { Button, DatePicker, Input, Space, notification } from "antd";
// import moment from "moment";
// import {
//   createImmunization,
//   deleteImmunization,
// } from "../../services/EmrService"; // Import these functions as needed

// interface Immunization {
//   id?: number;
//   vaccinationName: string;
//   administrationDate: string;
//   reaction: string;
// }

// interface ImmunizationsSectionProps {
//   emrId: number;
// }

// const ImmunizationsSection: React.FC<ImmunizationsSectionProps> = ({
//   emrId,
// }) => {
//   const [immunizations, setImmunizations] = useState<Immunization[]>([]);

//   const handleAddItem = () => {
//     setImmunizations([
//       ...immunizations,
//       { vaccinationName: "", administrationDate: "", reaction: "" },
//     ]);
//   };

//   const handleInputChange = <T,>(
//     setter: React.Dispatch<React.SetStateAction<T>>,
//     index: number | null,
//     field: string,
//     value: string
//   ) => {
//     setter((current: T) => {
//       if (Array.isArray(current) && typeof index === "number") {
//         return current.map((item, i) =>
//           i === index ? { ...item, [field]: value } : item
//         ) as T;
//       } else if (
//         index === null &&
//         typeof current === "object" &&
//         current !== null
//       ) {
//         return { ...current, [field]: value } as T;
//       }
//       return current;
//     });
//   };

//   const handleSaveImmunization = async (index: number) => {
//     try {
//       const immunization = immunizations[index];
//       const response = await createImmunization(emrId, immunization);
//       notification.success({
//         message: "Immunization added successfully",
//         description: "The immunization has been successfully saved.",
//       });
//     } catch (error) {
//       notification.error({
//         message: "Error adding immunization",
//         description: "There was an error while saving the immunization.",
//       });
//     }
//   };

//   const handleDeleteImmunization = async (index: number) => {
//     const immunizationId = immunizations[index].id;
//     if (immunizationId) {
//       try {
//         await deleteImmunization(immunizationId);
//         const updatedImmunizations = immunizations.filter(
//           (_, idx) => idx !== index
//         );
//         setImmunizations(updatedImmunizations);
//         notification.success({ message: "Immunization deleted successfully" });
//       } catch (error) {
//         notification.error({
//           message: "Error deleting immunization",
//           description: "There was an error while deleting the immunization.",
//         });
//       }
//     } else {
//       const updatedImmunizations = immunizations.filter(
//         (_, idx) => idx !== index
//       );
//       setImmunizations(updatedImmunizations);
//       notification.info({ message: "Unsaved immunization removed" });
//     }
//   };

//   return (
//     <div>
//       <h2>Immunizations</h2>
//       {immunizations.map((immunization, index) => (
//         <Space
//           key={index}
//           style={{ display: "flex", marginBottom: 8 }}
//           align="baseline"
//         >
//           <Input
//             placeholder="Vaccination Name"
//             value={immunization.vaccinationName}
//             onChange={(e) =>
//               handleInputChange(
//                 setImmunizations,
//                 index,
//                 "vaccinationName",
//                 e.target.value
//               )
//             }
//           />
//           <DatePicker
//             placeholder="Administration Date"
//             format="YYYY-MM-DD"
//             value={
//               immunization.administrationDate
//                 ? moment(immunization.administrationDate, "YYYY-MM-DD")
//                 : undefined
//             }
//             onChange={(_date, dateString) =>
//               handleInputChange(
//                 setImmunizations,
//                 index,
//                 "administrationDate",
//                 dateString[0]
//               )
//             }
//             style={{ width: "100%" }}
//           />
//           <Input
//             placeholder="Reaction"
//             value={immunization.reaction}
//             onChange={(e) =>
//               handleInputChange(
//                 setImmunizations,
//                 index,
//                 "reaction",
//                 e.target.value
//               )
//             }
//           />
//           <Button onClick={() => handleSaveImmunization(index)}>Save</Button>
//           <Button danger onClick={() => handleDeleteImmunization(index)}>
//             Delete
//           </Button>
//         </Space>
//       ))}
//       <Button onClick={handleAddItem} type="dashed">
//         Add Immunization
//       </Button>
//     </div>
//   );
// };

// export default ImmunizationsSection;
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
import {
  createImmunization,
  deleteImmunization,
} from "../../services/EmrService";

interface Immunization {
  id?: number;
  vaccinationName: string;
  administrationDate: string;
  reaction: string;
}

interface ImmunizationsSectionProps {
  emrId: number;
}

const ImmunizationsSection: React.FC<ImmunizationsSectionProps> = ({
  emrId,
}) => {
  const [immunizations, setImmunizations] = useState<Immunization[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImmunization, setCurrentImmunization] =
    useState<Immunization | null>(null);
  const [form] = Form.useForm();

  const showModal = (immunization?: Immunization) => {
    if (immunization) {
      form.setFieldsValue({
        ...immunization,
        administrationDate: moment(immunization.administrationDate),
      });
      setCurrentImmunization(immunization);
    } else {
      form.resetFields();
      setCurrentImmunization(null);
    }
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values: any) => {
    const formData = {
      ...values,
      administrationDate: values.administrationDate.format("YYYY-MM-DD"),
    };

    try {
      if (currentImmunization && currentImmunization.id) {
        // Update logic here if needed
      } else {
        const response = await createImmunization(emrId, formData);
        setImmunizations([
          ...immunizations,
          { ...formData, id: response.data.id },
        ]);
        notification.success({
          message: "Immunization added successfully",
          description: "The immunization has been successfully saved.",
        });
      }
      setIsModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Error saving immunization",
        description: "There was an error while saving the immunization.",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteImmunization(id);
      setImmunizations(
        immunizations.filter((immunization) => immunization.id !== id)
      );
      notification.success({ message: "Immunization deleted successfully" });
    } catch (error) {
      notification.error({
        message: "Error deleting immunization",
        description: "There was an error while deleting the immunization.",
      });
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>
        Add Immunization
      </Button>
      <List
        dataSource={immunizations}
        renderItem={(immunization) => (
          <List.Item
            actions={[
              <Button key="edit" onClick={() => showModal(immunization)}>
                Edit
              </Button>,
              <Button
                key="delete"
                danger
                onClick={() => handleDelete(immunization.id!)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={immunization.vaccinationName}
              description={`Date: ${moment(
                immunization.administrationDate
              ).format("LL")}, Reaction: ${immunization.reaction}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title={currentImmunization ? "Edit Immunization" : "Add Immunization"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="vaccinationName"
            label="Vaccination Name"
            rules={[
              { required: true, message: "Please enter the vaccination name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="administrationDate"
            label="Administration Date"
            rules={[
              {
                required: true,
                message: "Please select the administration date!",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="reaction" label="Reaction">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentImmunization ? "Update Immunization" : "Add Immunization"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ImmunizationsSection;
