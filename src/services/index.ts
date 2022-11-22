/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from "axios";
import { API_URL } from "config";
import { getAccessToken } from "./storage";

export const baseRequest = axios.create({ baseURL: API_URL });

export const request = (responseType: any = "json") => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    responseType,
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};
