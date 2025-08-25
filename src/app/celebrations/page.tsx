"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { Person } from "@/types";
import { format, addDays, subDays } from "date-fns";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
  PhoneIcon,
  HeartIcon,
  CakeIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function CelebrationsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [celebrations, setCelebrations] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<"all" | "birthday" | "anniversary">("all");

  useEffect(() => {
    loadCelebrations();
  }, [selectedDate]);

  const loadCelebrations = async () => {
    try {
      setLoading(true);
      const dateStr = format(selectedDate, "MM-dd");
      const data = await apiClient.getCelebrationsForDate(dateStr);
      setCelebrations(data);
    } catch (error) {
      console.error("Error loading celebrations:", error);
      toast.error("Failed to load celebrations");
    } finally {
      setLoading(false);
    }
  };

  const goToPreviousDay = () => {
    setSelectedDate(subDays(selectedDate, 1));
  };

  const goToNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const filteredCelebrations = celebrations.filter((person) => {
    return filterType === "all" || person.event_type === filterType;
  });

  const birthdayCount = celebrations.filter((p) => p.event_type === "birthday").length;
  const anniversaryCount = celebrations.filter((p) => p.event_type === "anniversary").length;

  const formatCelebrationDate = (person: Person) => {
    const [month, day] = person.event_date.split("-");
    const date = new Date(2024, parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  const calculateAge = (person: Person) => {
    if (!person.year) return null;
    const currentYear = new Date().getFullYear();
    return currentYear - person.year;
  };

  const isToday = format(selectedDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

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
          <div style={{ fontSize: "18px", color: "#6b7280" }}>Loading celebrations...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
          Celebrations
        </h1>
        <p style={{ color: "#6b7280" }}>View celebrations for any date</p>
      </div>

      {/* Date Navigation */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          padding: "24px",
          marginBottom: "32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={goToPreviousDay}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                backgroundColor: "#f3f4f6",
                color: "#374151",
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
              type="button"
            >
              <ChevronLeftIcon style={{ height: "16px", width: "16px" }} />
              Previous
            </button>

            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", margin: 0 }}>
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </h2>
              {isToday && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "500",
                    backgroundColor: "#dbeafe",
                    color: "#1e40af",
                    marginTop: "4px",
                  }}
                >
                  Today
                </span>
              )}
            </div>

            <button
              onClick={goToNextDay}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                backgroundColor: "#f3f4f6",
                color: "#374151",
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
              type="button"
            >
              Next
              <ChevronRightIcon style={{ height: "16px", width: "16px" }} />
            </button>
          </div>

          <button
            onClick={goToToday}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
            type="button"
          >
            Today
          </button>
        </div>
      </div>

      {/* Stats and Filter */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <CalendarDaysIcon style={{ height: "32px", width: "32px", color: "#2563eb" }} />
            <div style={{ marginLeft: "16px" }}>
              <p style={{ fontSize: "14px", fontWeight: "500", color: "#6b7280", margin: 0 }}>
                Total Celebrations
              </p>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", margin: 0 }}>
                {celebrations.length}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <CakeIcon style={{ height: "32px", width: "32px", color: "#ec4899" }} />
            <div style={{ marginLeft: "16px" }}>
              <p style={{ fontSize: "14px", fontWeight: "500", color: "#6b7280", margin: 0 }}>
                Birthdays
              </p>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", margin: 0 }}>
                {birthdayCount}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <HeartIcon style={{ height: "32px", width: "32px", color: "#8b5cf6" }} />
            <div style={{ marginLeft: "16px" }}>
              <p style={{ fontSize: "14px", fontWeight: "500", color: "#6b7280", margin: 0 }}>
                Anniversaries
              </p>
              <p style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", margin: 0 }}>
                {anniversaryCount}
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            padding: "24px",
          }}
        >
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#6b7280",
              marginBottom: "8px",
            }}
          >
            Filter
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            <option value="all">All Events</option>
            <option value="birthday">Birthdays</option>
            <option value="anniversary">Anniversaries</option>
          </select>
        </div>
      </div>

      {/* Celebrations List */}
      {filteredCelebrations.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredCelebrations.map((person) => (
            <div
              key={person.id}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                padding: "24px",
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    backgroundColor: person.event_type === "birthday" ? "#fce7f3" : "#f3e8ff",
                  }}
                >
                  {person.event_type === "birthday" ? "🎂" : "💕"}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#111827",
                        margin: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {person.name}
                    </h3>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "500",
                        backgroundColor: person.event_type === "birthday" ? "#fce7f3" : "#f3e8ff",
                        color: person.event_type === "birthday" ? "#be185d" : "#7c3aed",
                      }}
                    >
                      {person.event_type === "birthday" ? "Birthday" : "Anniversary"}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                        color: "#6b7280",
                      }}
                    >
                      <CalendarDaysIcon
                        style={{ height: "16px", width: "16px", marginRight: "8px" }}
                      />
                      {formatCelebrationDate(person)}
                    </div>

                    {calculateAge(person) && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "14px",
                          color: "#6b7280",
                        }}
                      >
                        <UserIcon style={{ height: "16px", width: "16px", marginRight: "8px" }} />
                        {calculateAge(person)}{" "}
                        {person.event_type === "birthday" ? "years old" : "years married"}
                      </div>
                    )}

                    {person.spouse && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "14px",
                          color: "#6b7280",
                        }}
                      >
                        <HeartIcon style={{ height: "16px", width: "16px", marginRight: "8px" }} />
                        Spouse: {person.spouse}
                      </div>
                    )}

                    {person.phone_number && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "14px",
                          color: "#6b7280",
                        }}
                      >
                        <PhoneIcon style={{ height: "16px", width: "16px", marginRight: "8px" }} />
                        {person.phone_number}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            padding: "48px",
            textAlign: "center",
          }}
        >
          <CalendarDaysIcon
            style={{ height: "48px", width: "48px", color: "#d1d5db", margin: "0 auto 16px" }}
          />
          <h3
            style={{ fontSize: "18px", fontWeight: "500", color: "#111827", marginBottom: "8px" }}
          >
            No celebrations
          </h3>
          <p style={{ color: "#6b7280", margin: 0 }}>
            {filterType === "all"
              ? `No celebrations on ${format(selectedDate, "MMMM d, yyyy")}`
              : `No ${filterType === "birthday" ? "birthdays" : "anniversaries"} on ${format(
                  selectedDate,
                  "MMMM d, yyyy"
                )}`}
          </p>
        </div>
      )}
    </div>
  );
}
