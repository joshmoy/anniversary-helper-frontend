"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { MessageLog } from "@/types";
import toast from "react-hot-toast";
import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarDaysIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "success" | "failed">("all");
  const [selectedMessage, setSelectedMessage] = useState<MessageLog | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await apiClient.getMessageLogs();
      setMessages(data);
    } catch (error) {
      console.error("Error loading messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearch = message.message_content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "success" && message.success) ||
      (filterStatus === "failed" && !message.success);
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateMessage = (message: string, maxLength: number = 100) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + "...";
  };

  const successCount = messages.filter((m) => m.success).length;
  const failedCount = messages.filter((m) => !m.success).length;

  if (loading) {
    return (
      <div style={{ padding: "32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <div style={{ fontSize: "18px", color: "#6b7280" }}>Loading messages...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
          Message History
        </h1>
        <p style={{ color: "#6b7280" }}>
          View all sent celebration messages and their delivery status
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ChatBubbleLeftRightIcon style={{ height: "24px", width: "24px", color: "#2563eb" }} />
            <div>
              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Total Messages</p>
              <p style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", margin: 0 }}>
                {messages.length}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <CheckCircleIcon style={{ height: "24px", width: "24px", color: "#10b981" }} />
            <div>
              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Successful</p>
              <p style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", margin: 0 }}>
                {successCount}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <XCircleIcon style={{ height: "24px", width: "24px", color: "#ef4444" }} />
            <div>
              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Failed</p>
              <p style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", margin: 0 }}>
                {failedCount}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <CalendarDaysIcon style={{ height: "24px", width: "24px", color: "#8b5cf6" }} />
            <div>
              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Success Rate</p>
              <p style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", margin: 0 }}>
                {messages.length > 0 ? Math.round((successCount / messages.length) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {/* Search */}
          <div
            style={{
              paddingLeft: "40px",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "14px",
              width: "250px",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <MagnifyingGlassIcon
              style={{
                height: "16px",
                width: "16px",
                color: "#6b7280",
              }}
            />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                fontSize: "14px",
                width: "200px",
              }}
            />
          </div>

          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            style={{
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            <option value="all">All Messages</option>
            <option value="success">Successful Only</option>
            <option value="failed">Failed Only</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        {filteredMessages.length > 0 ? (
          <div>
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                style={{
                  padding: "20px",
                  borderBottom: "1px solid #f3f4f6",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onClick={() => setSelectedMessage(message)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      {message.success ? (
                        <CheckCircleIcon
                          style={{ height: "16px", width: "16px", color: "#10b981" }}
                        />
                      ) : (
                        <XCircleIcon style={{ height: "16px", width: "16px", color: "#ef4444" }} />
                      )}
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: message.success ? "#10b981" : "#ef4444",
                        }}
                      >
                        {message.success ? "Delivered" : "Failed"}
                      </span>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>
                        {formatDate(message.sent_date)} at {formatTime(message.created_at)}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: "14px",
                        color: "#111827",
                        margin: "0 0 8px 0",
                        lineHeight: "1.5",
                      }}
                    >
                      {truncateMessage(message.message_content)}
                    </p>

                    {message.error_message && (
                      <div
                        style={{
                          backgroundColor: "#fef2f2",
                          border: "1px solid #fecaca",
                          borderRadius: "4px",
                          padding: "8px",
                          marginTop: "8px",
                        }}
                      >
                        <p style={{ fontSize: "12px", color: "#dc2626", margin: 0 }}>
                          <strong>Error:</strong> {message.error_message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <UserIcon style={{ height: "16px", width: "16px", color: "#6b7280" }} />
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>
                      {message.person_name || `Person ID: ${message.person_id}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: "48px",
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            <ChatBubbleLeftRightIcon
              style={{ height: "48px", width: "48px", margin: "0 auto 16px", color: "#d1d5db" }}
            />
            <p style={{ fontSize: "16px", margin: 0 }}>
              {searchTerm || filterStatus !== "all"
                ? "No messages match your search criteria"
                : "No messages found"}
            </p>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", margin: 0 }}>
                Message Details
              </h3>
              <button
                onClick={() => setSelectedMessage(null)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}
              >
                {selectedMessage.success ? (
                  <CheckCircleIcon style={{ height: "20px", width: "20px", color: "#10b981" }} />
                ) : (
                  <XCircleIcon style={{ height: "20px", width: "20px", color: "#ef4444" }} />
                )}
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: selectedMessage.success ? "#10b981" : "#ef4444",
                  }}
                >
                  {selectedMessage.success ? "Successfully Delivered" : "Delivery Failed"}
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                Sent on {formatDate(selectedMessage.sent_date)} at{" "}
                {formatTime(selectedMessage.created_at)}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                padding: "16px",
                marginBottom: "16px",
              }}
            >
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "8px",
                }}
              >
                Message Content:
              </h4>
              <pre
                style={{
                  fontSize: "14px",
                  color: "#374151",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                }}
              >
                {selectedMessage.message_content}
              </pre>
            </div>

            {selectedMessage.error_message && (
              <div
                style={{
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "6px",
                  padding: "12px",
                }}
              >
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#dc2626",
                    marginBottom: "4px",
                  }}
                >
                  Error Details:
                </h4>
                <p style={{ fontSize: "14px", color: "#dc2626", margin: 0 }}>
                  {selectedMessage.error_message}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
