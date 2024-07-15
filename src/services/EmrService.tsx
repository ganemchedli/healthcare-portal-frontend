import axios from "../config/axios";
//Electronic medical record
export const createEmr = async (doctorId: any) =>
  axios.post("emr", doctorId, {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const getEmr = async (id: Number) => axios.get("emr/" + id);
export const getEmrByDoctorId = async (doctorId: any) =>
  axios.get("emr/doctor/" + doctorId);
export const deleteEmr = async (id: any) => axios.delete("emr/" + id);
//Clinical Note
export const getAllClinicalNotesByEmrId = async (emrId: any) =>
  axios.get("emr/" + emrId + "/clinicalNotes");
export const createClinicalNote = async (emrId: any, clinicalNote: any) =>
  axios.post("emr/" + emrId + "/clinicalNotes", clinicalNote);
export const deleteClinicalNote = async (clinicalNoteId: any) =>
  axios.delete("clinicalNotes/" + clinicalNoteId);
export const deleteAllClinicalNoteOfEmr = async (emrId: any) =>
  axios.delete("emr/" + emrId + "/clinicalNotes");
//Immunization
export const getAllImmunizationByEmrId = async (emrId: any) =>
  axios.get("emr/" + emrId + "/immunizations");
export const createImmunization = async (emrId: any, immunization: any) =>
  axios.post("emr/" + emrId + "/immunizations", immunization);
export const deleteImmunization = async (immunizationId: any) =>
  axios.delete("immunizations/" + immunizationId);
export const deledeleteAllImmunizationOfEmr = async (emrId: any) =>
  axios.delete("emr/" + emrId + "/immunizations");
//Insurance
export const getInsuranceByEmrId = async (emrId: any) =>
  axios.get("insurance/" + emrId);
export const createInsurance = async (emrId: any, insurance: any) =>
  axios.post("emr/" + emrId + "/insurance", insurance);
export const deleteInsurance = async (insuranceId: any) =>
  axios.delete("insurance/" + insuranceId);
//Lab Test
export const getAllLabTestsByEmrId = async (emrId: any) =>
  axios.get("emr/" + emrId + "/labTests");
export const getLabTestByEmrId = async (emrId: any) =>
  axios.get("labTests/" + emrId);
export const createLabTest = async (emrId: any, labTest: any) =>
  axios.post("emr/" + emrId + "/labTests", labTest);
export const deleteLabTest = async (labTestId: any) =>
  axios.delete("labTests/" + labTestId);
export const deleteAllLabTestsOfEmr = async (emrId: any) =>
  axios.delete("emr/" + emrId + "/labTests");
//Medical History
export const getMedicalHistoryByEmrId = async (emrId: any) =>
  axios.get("medicalHistory/" + emrId);
export const createMedicalHistory = async (emrId: any, medicalHistory: any) =>
  axios.post("emr/" + emrId + "/medicalHistory", medicalHistory);
export const deleteMedicalHistory = async (medicalHistoryId: any) =>
  axios.delete("medicalHistory/" + medicalHistoryId);
//Medication
export const getAllMedicationByEmrId = async (emrId: any) =>
  axios.get("emr/" + emrId + "/medications");
export const getMedicationByEmrId = async (emrId: any) =>
  axios.get("medications/" + emrId);
export const createMedication = async (emrId: any, medication: any) =>
  axios.post("emr/" + emrId + "/medications", medication);
export const deleteMedication = async (medicationId: any) =>
  axios.delete("medications/" + medicationId);
export const deleteAllMedicationOfEmr = async (emrId: any) =>
  axios.delete("emr/" + emrId + "/medications");
//patient
export const getPatientByEmail = async (email: any, emrId: any) => {
  try {
    const response = await axios.get("patient/" + emrId, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching patient details:", error);
    throw error;
  }
};

export const getPatientByEmailByClient = async (email: any) => {
  try {
    const response = await axios.get("patient/client/email", {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching patient details:", error);
    throw error;
  }
};

export const getPatientByEmailOnly = async (email: any) => {
  try {
    const response = await axios.get("patient/email", {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching patient details:", error);
    throw error;
  }
};

export const getPatientByEmrId = async (emrId: any) =>
  axios.get("patient/emr/" + emrId);
export const getAllPatients = async () => axios.get("patient/all");

export const getPatientById = async (id: any) => axios.get("patient/id/" + id);
//Plan
export const getAllPlanByEmrId = async (emrId: any) =>
  axios.get("emr/" + emrId + "/plans");
export const getPlanByEmrId = async (emrId: any) => axios.get("plans/" + emrId);
export const createPlan = async (emrId: any, plan: any) =>
  axios.post("emr/" + emrId + "/plans", plan);
export const deletePlan = async (planId: any) =>
  axios.delete("plans/" + planId);
export const deleteAllPlanOfEmr = async (emrId: any) =>
  axios.delete("emr/" + emrId + "/plans");
//Surgery
export const getAllSurgeriesByMedHistoryId = async (medHistoryId: any) =>
  axios.get("medicalHistory/" + medHistoryId + "/surgeries");
export const getSurgeriesByMedHistoryId = async (medHistoryId: any) =>
  axios.get("surgeries/" + medHistoryId);
export const createSurgery = async (medHistoryId: any, surgery: any) =>
  axios.post("medicalHistory/" + medHistoryId + "/surgeries", surgery);
export const deleteSurgery = async (surgeryId: any) =>
  axios.delete("surgeries/" + surgeryId);
export const deleteAllSurgeriesOfMedHistory = async (medHistoryId: any) =>
  axios.delete("medicalHistory/" + medHistoryId + "/surgeries");
//Vital Signs
export const getAllVitalSignsByEmrId = async (emrId: any) =>
  axios.get("emr/" + emrId + "/vitalSigns");
export const getVitalSignsByEmrId = async (emrId: any) =>
  axios.get("vitalSigns/" + emrId);
export const createVitalSigns = async (emrId: any, vitalSigns: any) =>
  axios.post("emr/" + emrId + "/vitalSigns", vitalSigns);
export const deleteVitalSigns = async (vitalSignsId: any) =>
  axios.delete("vitalSigns/" + vitalSignsId);
export const deleteAllVitalSignsOfEmr = async (emrId: any) =>
  axios.delete("emr/" + emrId + "/vitalSigns");
