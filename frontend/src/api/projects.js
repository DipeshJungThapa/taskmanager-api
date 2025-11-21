import axios from "../api/axiosClient";

export const projectAPI = {
  list: () => axios.get("/projects/"),
  create: (data) => axios.post("/projects/", data),
  get: (id) => axios.get(`/projects/${id}/`),
  update: (id, data) => axios.patch(`/projects/${id}/`, data),
  delete: (id) => axios.delete(`/projects/${id}/`),
};
