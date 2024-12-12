import axios from "axios";

const API_URL = "http://localhost:8000/api/status";


export const fetchStatuses = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching statuses:", error);
    throw error;
  }
};

export const createStatus = async (statusData, token) => {
  try {
    const response = await axios.post(`${API_URL}/create`, statusData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating status:", error);
    throw error;
  }
};

export const deleteStatus = async (statusId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${statusId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting status:", error);
    throw error;
  }
};
