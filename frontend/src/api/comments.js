import axios from "./axiosClient";

export const commentAPI = {
  list: (params) => axios.get("/comments/", { params }),
  create: (data) => axios.post("/comments/", data),
  get: (id) => axios.get(`/comments/${id}/`),
  update: (id, data) => axios.patch(`/comments/${id}/`, data),
  delete: (id) => axios.delete(`/comments/${id}/`),
};
