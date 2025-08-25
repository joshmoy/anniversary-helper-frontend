import axios from "axios";
import { Person, PersonCreate, MessageLog, HealthStatus, CSVUploadResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClient = {
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
};
