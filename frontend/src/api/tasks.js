import axios from "../api/axiosClient";

export const taskAPI = {
  list: (params) => axios.get("/tasks/", { params }),
  create: (data) => axios.post("/tasks/", data),
  get: (id) => axios.get(`/tasks/${id}/`),
  update: (id, data) => axios.patch(`/tasks/${id}/`, data),
  delete: (id) => axios.delete(`/tasks/${id}/`),
  
  // Nested resources
  listComments: (taskId) => axios.get(`/tasks/${taskId}/comments/`),
  createComment: (taskId, data) => axios.post(`/tasks/${taskId}/comments/`, data),
  updateComment: (taskId, commentId, data) => axios.patch(`/tasks/${taskId}/comments/${commentId}/`, data),
  deleteComment: (taskId, commentId) => axios.delete(`/tasks/${taskId}/comments/${commentId}/`),
  
  listAttachments: (taskId) => axios.get(`/tasks/${taskId}/attachments/`),
  uploadAttachment: (taskId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(`/tasks/${taskId}/attachments/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deleteAttachment: (taskId, attachmentId) => axios.delete(`/tasks/${taskId}/attachments/${attachmentId}/`),
};
