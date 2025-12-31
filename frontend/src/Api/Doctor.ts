import { axiosInstance } from "./axiosInstance";

export const getMyAppointments = async () => {
  const { data } = await axiosInstance.get("/api/v1/doctor/appointments");
  return data.data;
};

export const getDoctorById = async (id: string) => {
  const { data } = await axiosInstance.get(`/api/v1/doctor/${id}`);
  return data;
};



export const updateAppointmentStatus = async (
  id: string,
  status: "approved" | "cancelled"
) => {
  const { data } = await axiosInstance.patch(
    `/api/v1/doctor/appointments/${id}/status`,
    { status }
  );
  return data.data;
};
