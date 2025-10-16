"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/api";
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
      <div className="p-8">
        <div className="flex justify-center items-center h-48">
          <div className="text-lg text-gray-500">Loading messages...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Message History</h1>
        <p className="text-gray-600">
          View all sent celebration messages and their delivery status
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <div className="flex items-center">
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-gray-900">{successCount}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <XCircleIcon className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-gray-900">{failedCount}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {messages.length > 0 ? Math.round((successCount / messages.length) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex gap-4 items-center">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-64"
            />
          </div>

          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="input-field"
          >
            <option value="all">All Messages</option>
            <option value="success">Successful Only</option>
            <option value="failed">Failed Only</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="card overflow-hidden">
        {filteredMessages.length > 0 ? (
          <div>
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className="p-5 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {message.success ? (
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircleIcon className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          message.success ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {message.success ? "Delivered" : "Failed"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(message.sent_date)} at {formatTime(message.created_at)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-900 mb-2 leading-relaxed">
                      {truncateMessage(message.message_content)}
                    </p>

                    {message.error_message && (
                      <div className="bg-red-50 border border-red-200 rounded p-2 mt-2">
                        <p className="text-xs text-red-600">
                          <strong>Error:</strong> {message.error_message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-xs text-gray-500">
                      {message.person_name || `Person ID: ${message.person_id}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-600">
            <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-base">
              {searchTerm || filterStatus !== "all"
                ? "No messages match your search criteria"
                : "No messages found"}
            </p>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Message Details</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-light"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                {selectedMessage.success ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    selectedMessage.success ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {selectedMessage.success ? "Successfully Delivered" : "Delivery Failed"}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Sent on {formatDate(selectedMessage.sent_date)} at{" "}
                {formatTime(selectedMessage.created_at)}
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Message Content:</h4>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-inherit">
                {selectedMessage.message_content}
              </pre>
            </div>

            {selectedMessage.error_message && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <h4 className="text-sm font-semibold text-red-700 mb-1">Error Details:</h4>
                <p className="text-sm text-red-700">{selectedMessage.error_message}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
