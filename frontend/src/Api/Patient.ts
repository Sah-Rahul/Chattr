import { axiosInstance } from "./axiosInstance";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

interface LoginForm {
  email: string;
  password: string;
}

export const registerPatient = async (form: RegisterForm) => {
  const { data } = await axiosInstance.post("/api/v1/auth/register", form);
  return data;
};

export const loginPatient = async (form: LoginForm) => {
  const { data } = await axiosInstance.post("/api/v1/auth/login", form);
  return data;
};

export const logoutPatient = async () => {
  const { data } = await axiosInstance.post("/api/v1/auth/logout");
  return data;
};

export const getPatientProfile = async () => {
  const { data } = await axiosInstance.post("/api/v1/auth/profile");
  return data;
};
