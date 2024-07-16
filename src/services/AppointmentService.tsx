import axios from "../config/axios";

export const createAppointment = async (appointment: any) =>
  axios.post("appointment/create", appointment);

export const getAppointment = async (id: Number) =>
  axios.get("appointment/get/" + id);
export const getAppointmentsByDoctorId = async (doctorId: number) =>
  axios.get("appointment/doctor/" + doctorId);
export const getAppointmentsByPatientId = async (patientId: number) =>
  axios.get("appointment/patient/" + patientId);

export const getAllAppointments = async () => axios.get("appointment/all");
export const updateAppointment = async (id: any, updatedFields: any) =>
  axios.put("appointment/update/" + id, updatedFields);
export const deleteAppointment = async (id: any) =>
  axios.delete("appointment/delete/" + id);
