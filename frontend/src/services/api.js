// api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Result Format API calls
export const createResultFormat = async (formatData) => {
  try {
    const response = await api.post("/result-formats", formatData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating result format:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const fetchResultFormatById = async (id) => {
  try {
    const response = await api.get(`/result-formats/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching result format:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const fetchAllResultFormats = async () => {
  try {
    const response = await api.get("/result-formats");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching all result formats:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const updateResultFormat = async (id, formatData) => {
  try {
    const response = await api.put(`/result-formats/${id}`, formatData);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating result format:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const deleteResultFormat = async (id) => {
  try {
    const response = await api.delete(`/result-formats/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting result format:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const fetchResultFormatByStandard = async (standard, academicYear) => {
  try {
    const response = await api.get(`/result-formats/standard/${standard}`, {
      params: { academicYear },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching result format by standard:", error);
    throw error;
  }
};


// Student API calls
export const getStudents = async (filters = {}) => {
  try {
    const { standard, search } = filters;
    let queryParams = new URLSearchParams();
    
    if (standard) queryParams.append('standard', standard);
    if (search) queryParams.append('search', search);
    
    const response = await api.get(`/students?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student details:', error);
    throw error;
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await api.post('/students', studentData);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

export const updateStudentResult = async (studentId, resultData) => {
  try {
    const response = await api.put(`/students/${studentId}/result`, {
      result: resultData,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating student result:", error);
    throw error;
  }
};

// services/api.js
export const downloadStudentResult = async (studentId) => {
  try {
    const response = await api.get(`/students/${studentId}/result/download`, {
      responseType: "blob", // Ensure binary data is handled properly
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    // Validate response
    if (!(response.data instanceof Blob)) {
      throw new Error("Invalid PDF response from server");
    }

    // Create a Blob object and trigger download
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `student_result_${studentId}.pdf`);

    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading student result:", error);

    if (error.response && error.response.status === 404) {
      throw new Error("Student result not found");
    }

    throw new Error("Failed to download result. Please try again.");
  }
};


// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.post('/auth/verify'),
};



export default api;
