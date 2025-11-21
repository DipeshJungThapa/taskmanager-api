import axios from "../api/axiosClient";

export const subtaskAPI = {
  list: (params) => axios.get("/subtasks/", { params }),
  create: (data) => axios.post("/subtasks/", data),
  update: (id, data) => axios.patch(`/subtasks/${id}/`, data),
  delete: (id) => axios.delete(`/subtasks/${id}/`),
};
