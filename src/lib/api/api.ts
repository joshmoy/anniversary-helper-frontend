import axios from "axios";
import {
  Person,
  HealthStatus,
  CSVUploadResponse,
  LoginResponse,
  BackendLoginResponse,
  AnniversaryWishRequest,
  AnniversaryWishResponse,
  RegenerateWishRequest,
} from "../../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiWithoutAuth = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle auth redirects if we have a response (backend is reachable)
    if (error.response?.status === 401 && typeof window !== "undefined") {
      // Token is invalid, remove it and redirect to login
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      window.location.href = "/auth/login";
    }
    // For network errors (backend down), just reject without redirecting
    return Promise.reject(error);
  }
);

export const apiClient = {
  // Authentication
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await api.post<BackendLoginResponse>("/auth/login", { username, password });
    const data = response.data;

    // Transform backend response to match frontend expectations
    return {
      token: data.access_token,
      user: {
        id: 1, // Backend doesn't provide ID, using default
        username: data.admin.username,
      },
    };
  },

  // Health check
  async getHealth(): Promise<HealthStatus> {
    const response = await api.get("/health");
    return response.data;
  },

  // People management
  async getPeople(): Promise<Person[]> {
    const response = await api.get("/people");
    return response.data;
  },

  async getPerson(personId: number): Promise<Person> {
    const response = await api.get(`/people/${personId}`);
    return response.data;
  },

  async updatePerson(personId: number, personData: Partial<Person>): Promise<Person> {
    const response = await api.put(`/people/${personId}`, personData);
    return response.data;
  },

  async deletePerson(personId: number): Promise<void> {
    await api.delete(`/people/${personId}`);
  },

  async getTodaysCelebrations(): Promise<Person[]> {
    const response = await api.get("/celebrations/today");
    return response.data;
  },

  async getCelebrationsForDate(date: string): Promise<Person[]> {
    const response = await api.get(`/celebrations/${date}`);
    return response.data;
  },

  // CSV upload
  async uploadCSV(file: File): Promise<CSVUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/upload-csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Scheduler
  async getSchedulerStatus() {
    const response = await api.get("/scheduler/status");
    return response.data;
  },

  async runManualCheck() {
    const response = await api.post("/scheduler/manual-run");
    return response.data;
  },

  // Send celebrations (for testing)
  async sendCelebrations() {
    const response = await api.post("/send-celebrations");
    return response.data;
  },

  // Message logs
  async getMessageLogs() {
    const response = await api.get("/messages");
    return response.data;
  },

  async getMessageLog(messageId: number) {
    const response = await api.get(`/messages/${messageId}`);
    return response.data;
  },

  // AI Wish Generator
  async generateAnniversaryWish(
    request: AnniversaryWishRequest,
    useAuth: boolean = false
  ): Promise<AnniversaryWishResponse> {
    const client = useAuth ? api : apiWithoutAuth;
    const response = await client.post("/api/anniversary-wish", request);
    return response.data;
  },

  async regenerateAnniversaryWish(
    request: RegenerateWishRequest,
    useAuth: boolean = false
  ): Promise<AnniversaryWishResponse> {
    const client = useAuth ? api : apiWithoutAuth;
    const response = await client.post("/api/anniversary-wish/regenerate", request);
    return response.data;
  },
};
