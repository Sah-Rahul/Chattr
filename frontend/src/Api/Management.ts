import { axiosInstance } from "./axiosInstance";

export const addDoctor = async (formData: FormData) => {
  const { data } = await axiosInstance.post(
    "/api/v1/management/doctor",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.data;
};

export const fetchDoctors = async () => {
  const { data } = await axiosInstance.get("/api/v1/management/doctors");
  return data.data;
};

export const fetchPatients = async () => {
  const { data } = await axiosInstance.get("/api/v1/management/patients");
  return data.data;
};

export const blockDoctor = async (id: string) => {
  const { data } = await axiosInstance.patch(
    `/api/v1/management/doctor/${id}/block`
  );
  return data;
};

export const fetchAllAppointments = async () => {
  const { data } = await axiosInstance.get("/api/v1/management/appointments");
  return data.data;
};
