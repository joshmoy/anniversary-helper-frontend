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

export interface User {
  id: number;
  username: string;
  email?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface BackendLoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  admin: {
    username: string;
    is_active: boolean;
  };
}

export interface CelebrationResponse {
  success: boolean;
  sent_count: number;
  failed_count?: number;
  errors?: string[];
  total_celebrations?: number;
  message?: string;
}

// Event types for contacts
export enum EventType {
  Birthday = "Birthday",
  WorkAnniversary = "Work Anniversary",
  Anniversary = "Anniversary",
}

// Relationship types
export enum RelationshipType {
  Employee = "employee",
  TeamMember = "team member",
  Client = "client",
  Friend = "friend",
  Family = "family",
}

// Status types
export enum StatusType {
  Active = "active",
  Inactive = "inactive",
}

// Contact interface for People page
export interface Contact {
  id: number;
  name: string;
  relationship: RelationshipType;
  eventType: EventType;
  eventDate: Date;
  email: string;
  phone: string | null;
  status: StatusType;
}

// AI Wish Generator API Types
export interface AnniversaryWishRequest {
  name: string;
  anniversary_type:
    | "birthday"
    | "work-anniversary"
    | "wedding-anniversary"
    | "promotion"
    | "retirement";
  relationship: string;
  tone: "professional" | "friendly" | "warm" | "humorous" | "formal";
  context?: string;
}

export interface AnniversaryWishResponse {
  generated_wish: string;
  request_id: string;
  remaining_requests: number;
  window_reset_time?: string;
}

export interface RegenerateWishRequest {
  request_id: string;
  additional_context?: string;
}

export interface AIWishError {
  detail: string;
  retry_after?: number;
}
