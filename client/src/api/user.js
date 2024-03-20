import axios from "../axios";

export const apiRegister = (data) => {
  return axios({
    url: "/user/register",
    method: "post",
    data: data,
    withCredentials: true,
  });
};

export const apiLogin = (data) => {
  return axios({
    url: "/user/login",
    method: "post",
    data: data,
  });
};

export const apiForgotPassword = (data) => {
  return axios({
    url: "/user/forgot-password",
    method: "post",
    data: data,
  });
};

export const apiResetPassword = (data) => {
  return axios({
    url: "/user/reset-password",
    method: "put",
    data: data,
  });
};

export const apiGetCurrent = (data) => {
  return axios({
    url: "/user/get-user-login",
    method: "get",
  });
};

export const apiGetUsers = (params) => {
  return axios({
    url: "/user/",
    method: "get",
    params: params,
  });
};

export const apiUpdateUser = (data, uid) => {
  return axios({
    url: "/user/" + uid,
    method: "put",
    data,
  });
};

export const apiDeleteUser = (uid) => {
  return axios({
    url: "/user/" + uid,
    method: "delete",
  });
};
