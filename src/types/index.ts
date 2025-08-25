export interface Person {
  id: number;
  name: string;
  event_type: "birthday" | "anniversary";
  event_date: string; // MM-DD format
  year?: number;
  spouse?: string;
  phone_number?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PersonCreate {
  name: string;
  event_type: "birthday" | "anniversary";
  event_date: string;
  year?: number;
  spouse?: string;
  phone_number?: string;
  active?: boolean;
}

export interface MessageLog {
  id: number;
  person_id: number;
  message_content: string;
  sent_date: string;
  success: boolean;
  error_message?: string;
  created_at: string;
  person_name?: string;
  person_event_type?: string;
  person_phone?: string;
}

export interface HealthStatus {
  status: "healthy" | "unhealthy";
  database?: string;
  scheduler?: {
    is_running: boolean;
    next_run_time?: string;
    timezone: string;
    schedule_time: string;
    job_count: number;
  };
  total_people?: number;
  error?: string;
}

export interface CSVUploadResponse {
  message: string;
  filename: string;
  storage_path: string;
  url: string;
  status: string;
  // Legacy fields for backward compatibility
  success?: boolean | string;
  records_processed?: number;
  records_added?: number;
  records_updated?: number;
  error?: string;
}

export interface CelebrationResponse {
  success: boolean;
  sent_count: number;
  failed_count?: number;
  errors?: string[];
  total_celebrations?: number;
  message?: string;
}
