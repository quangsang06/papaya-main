import { ACCESS_TOKEN, USER_INFOR } from "config/constants";

const storage = window.localStorage;

export const set = (key: string, value: string) => {
  return storage.setItem(key, value);
};

export const get = (key: string) => {
  return storage.getItem(key);
};

export const remove = (key: string) => {
  return storage.removeItem(key);
};

export const clear = () => {
  return storage.clear();
};

export const setAccessToken = (access: string) => {
  set(ACCESS_TOKEN, access);
};

export const getAccessToken = () => {
  return get(ACCESS_TOKEN);
};

export const getInforUser = () => {
  return get(USER_INFOR);
};

export const removeAccessToken = () => {
  remove(ACCESS_TOKEN);
};
