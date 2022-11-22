import { API_URL } from "config";
import { SUCCESS } from "config/constants";
import { IUser } from "models";
import { toast } from "react-toastify";
import { request } from "services";

export const fetchAllData = async () => {
  try {
    const response = await request().get(API_URL);
    return response.status === SUCCESS ? response.data : null;
  } catch {
    toast.error("Error!");
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await request().get(`${API_URL}/${id}`);
    return response.status === SUCCESS ? response.data : null;
  } catch {
    toast.error("Error!");
  }
};

export const addNewUser = async (params: IUser) => {
  try {
    const response = await request().post(API_URL, params);
    return response.status === 201 ? response.data : null;
  } catch {
    toast.error("Error!");
  }
};

export const updateUser = async (id: number, params: IUser) => {
  try {
    const response = await request().put(`${API_URL}/${id}`, params);
    return response.status === SUCCESS ? response.data : null;
  } catch {
    toast.error("Error!");
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await request().delete(`${API_URL}/${id}`);
    return response.status === SUCCESS ? response.data : null;
  } catch {
    toast.error("Error!");
  }
};
