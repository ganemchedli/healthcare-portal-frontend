// import React, { useState } from "react";
// import { Input, Space, Button, notification } from "antd";
// import { createInsurance, deleteInsurance } from "../../services/EmrService"; // Import your API functions as necessary

// interface Insurance {
//   id?: number;
//   providerName: string;
//   policyNumber: string;
//   billingRecord: string;
// }

// interface InsuranceSectionProps {
//   emrId: number;
// }

// const InsuranceSection: React.FC<InsuranceSectionProps> = ({ emrId }) => {
//   const [insurance, setInsurance] = useState<Insurance>({
//     providerName: "",
//     policyNumber: "",
//     billingRecord: "",
//   });

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

//   const handleSaveInsurance = async () => {
//     if (!insurance.id) {
//       try {
//         const response = await createInsurance(emrId, insurance);
//         notification.success({
//           message: "Insurance Information Saved",
//           description: "The insurance information has been successfully saved.",
//         });
//         setInsurance({ ...insurance, id: response.data.id }); // Assuming the response contains the ID
//       } catch (error) {
//         notification.error({
//           message: "Error Saving Insurance",
//           description: "There was a problem saving the insurance information.",
//         });
//       }
//     } else {
//       // You might want to implement an update function if the insurance is already saved
//     }
//   };

//   const handleDeleteInsurance = async () => {
//     if (insurance.id) {
//       try {
//         await deleteInsurance(insurance.id);
//         setInsurance({ providerName: "", policyNumber: "", billingRecord: "" });
//         notification.success({
//           message: "Insurance Information Deleted",
//           description:
//             "The insurance information has been successfully deleted.",
//         });
//       } catch (error) {
//         notification.error({
//           message: "Error Deleting Insurance",
//           description:
//             "There was a problem deleting the insurance information.",
//         });
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Insurance Information</h2>
//       <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
//         <Input
//           placeholder="Provider Name"
//           value={insurance.providerName}
//           onChange={(e) =>
//             handleInputChange(
//               setInsurance,
//               null,
//               "providerName",
//               e.target.value
//             )
//           }
//         />
//         <Input
//           placeholder="Policy Number"
//           value={insurance.policyNumber}
//           onChange={(e) =>
//             handleInputChange(
//               setInsurance,
//               null,
//               "policyNumber",
//               e.target.value
//             )
//           }
//         />
//         <Input
//           placeholder="Billing Record"
//           value={insurance.billingRecord}
//           onChange={(e) =>
//             handleInputChange(
//               setInsurance,
//               null,
//               "billingRecord",
//               e.target.value
//             )
//           }
//         />
//       </Space>
//       <Button onClick={handleSaveInsurance} type="primary">
//         Save Insurance
//       </Button>
//       <Button onClick={handleDeleteInsurance} danger>
//         Delete Insurance
//       </Button>
//     </div>
//   );
// };

// export default InsuranceSection;
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
