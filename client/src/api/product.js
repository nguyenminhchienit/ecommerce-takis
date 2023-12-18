import axios from "../axios";

export const apiGetProducts = (params) => {
  return axios({
    url: "/product/",
    method: "get",
    params: params,
  });
};

export const apiGetProduct = (pid) => {
  return axios({
    url: `/product/${pid}`,
    method: "get",
  });
};
