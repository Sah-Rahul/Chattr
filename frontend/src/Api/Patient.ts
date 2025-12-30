import { axiosInstance } from "./axiosInstance";

interface AddPatient {
  fullname: string;
  phone: string;
  age: number;
  blood: string;
  gender: "male" | "female" | "other"
  address: string
}


export const addPatient = async (form: AddPatient) => {
  const { data } = await axiosInstance.post("/api/v1/management/doctors", form);
  return data;
};

export const fetchDoctors = async () => {
  const { data } = await axiosInstance.get("/api/v1/management/all/doctors");
  return data?.data;
};