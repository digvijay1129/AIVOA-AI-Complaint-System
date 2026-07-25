import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Save Complaint API
export const saveComplaint = async (complaintData) => {
  const response = await api.post("/complaints", complaintData);
  return response.data;
};

// Get All Complaints API
export const getComplaints = async () => {
  const response = await api.get("/complaints");
  return response.data;
};

// Ask AI Question API
export const askAI = async (question) => {
  const response = await api.post("/chat", {
    question,
  });

  return response.data;
};

// Extract Complaint From Text API
export const extractComplaintFromText = async (text) => {
  const response = await api.post("/extract-text", {
    text,
  });

  return response.data;
};

// Update Complaint Fields API
export const updateComplaintFields = async (currentData, message) => {
  const response = await api.post("/update-fields", {
    current_data: currentData,
    message: message,
  });

  return response.data;
};

export default api;