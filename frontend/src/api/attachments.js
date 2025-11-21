import axios from "./axiosClient";

export const attachmentAPI = {
  list: (params) => axios.get("/attachments/", { params }),
  create: (formData) => axios.post("/attachments/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
  get: (id) => axios.get(`/attachments/${id}/`),
  delete: (id) => axios.delete(`/attachments/${id}/`),
};
