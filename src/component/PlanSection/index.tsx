import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  List,
  Modal,
  Form,
  notification,
  Space,
} from "antd";
import moment from "moment";
import { createPlan, deletePlan } from "../../services/EmrService"; // Import these functions as needed

interface Plan {
  id?: number;
  procedureName: string;
  procedureDate: string;
  outcome: string;
  anesthesiaRecords: string;
}

interface PlanSectionProps {
  emrId: number;
}

const PlanSection: React.FC<PlanSectionProps> = ({ emrId }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [form] = Form.useForm();

  const showModal = (plan?: Plan) => {
    if (plan) {
      form.setFieldsValue({
        ...plan,
        procedureDate: moment(plan.procedureDate),
      });
      setCurrentPlan(plan);
    } else {
      form.resetFields();
      setCurrentPlan(null);
    }
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values: any) => {
    const formData = {
      ...values,
      procedureDate: values.procedureDate.format("YYYY-MM-DD"),
    };

    if (currentPlan && currentPlan.id) {
      // Update existing plan logic here if needed
    } else {
      try {
        const response = await createPlan(emrId, formData);
        setPlans([...plans, { ...formData, id: response.data.id }]);
        notification.success({
          message: "Plan added successfully",
          description: "The plan has been successfully saved.",
        });
      } catch (error) {
        notification.error({
          message: "Error adding plan",
          description: "There was an error while saving the plan.",
        });
      }
    }
    setIsModalVisible(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePlan(id);
      setPlans(plans.filter((plan) => plan.id !== id));
      notification.success({ message: "Plan deleted successfully" });
    } catch (error) {
      notification.error({
        message: "Error deleting plan",
        description: "There was an error while deleting the plan.",
      });
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>
        Add Plan
      </Button>
      <List
        dataSource={plans}
        renderItem={(plan) => (
          <List.Item
            actions={[
              <Button key="edit" onClick={() => showModal(plan)}>
                Edit
              </Button>,
              <Button
                key="delete"
                danger
                onClick={() => handleDelete(plan.id!)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={plan.procedureName}
              description={`Date: ${moment(plan.procedureDate).format(
                "LL"
              )}, Outcome: ${plan.outcome}, Anesthesia Records: ${
                plan.anesthesiaRecords
              }`}
            />
          </List.Item>
        )}
      />
      <Modal
        title={currentPlan ? "Edit Plan" : "Add Plan"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="procedureName"
            label="Procedure Name"
            rules={[
              { required: true, message: "Please input the procedure name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="procedureDate"
            label="Procedure Date"
            rules={[
              { required: true, message: "Please select the procedure date!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="outcome" label="Outcome">
            <Input />
          </Form.Item>
          <Form.Item name="anesthesiaRecords" label="Anesthesia Records">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentPlan ? "Update Plan" : "Add Plan"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlanSection;
