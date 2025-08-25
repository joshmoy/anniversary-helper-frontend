"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { Person } from "@/types";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  CalendarDaysIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "birthday" | "anniversary">("all");
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [deletingPerson, setDeletingPerson] = useState<Person | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    event_type: "birthday" as "birthday" | "anniversary",
    event_date: "",
    year: "",
    spouse: "",
    phone_number: "",
  });

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    try {
      const data = await apiClient.getPeople();
      setPeople(data);
    } catch (error) {
      console.error("Error loading people:", error);
      toast.error("Failed to load people");
    } finally {
      setLoading(false);
    }
  };

  const filteredPeople = people.filter((person) => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || person.event_type === filterType;
    return matchesSearch && matchesFilter && person.active;
  });

  const formatDate = (dateStr: string) => {
    const [month, day] = dateStr.split("-");
    const date = new Date(2024, parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  const calculateAge = (person: Person) => {
    if (!person.year) return null;
    const currentYear = new Date().getFullYear();
    if (person.event_type === "birthday") {
      return currentYear - person.year;
    } else {
      return currentYear - person.year; // years married
    }
  };

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
    setEditForm({
      name: person.name,
      event_type: person.event_type,
      event_date: person.event_date,
      year: person.year?.toString() || "",
      spouse: person.spouse || "",
      phone_number: person.phone_number || "",
    });
  };

  const handleSaveEdit = async () => {
    if (!editingPerson) return;

    try {
      const updateData: Partial<Person> = {
        name: editForm.name,
        event_type: editForm.event_type,
        event_date: editForm.event_date,
        year: editForm.year ? parseInt(editForm.year) : undefined,
        spouse: editForm.spouse || undefined,
        phone_number: editForm.phone_number || undefined,
      };

      await apiClient.updatePerson(editingPerson.id, updateData);
      await loadPeople(); // Reload the list
      setEditingPerson(null);
      toast.success("Person updated successfully!");
    } catch (error) {
      console.error("Error updating person:", error);
      toast.error("Failed to update person");
    }
  };

  const handleDelete = (person: Person) => {
    setDeletingPerson(person);
  };

  const confirmDelete = async () => {
    if (!deletingPerson) return;

    try {
      await apiClient.deletePerson(deletingPerson.id);
      await loadPeople(); // Reload the list
      setDeletingPerson(null);
      toast.success("Person deleted successfully!");
    } catch (error) {
      console.error("Error deleting person:", error);
      toast.error("Failed to delete person");
    }
  };

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
          <div style={{ fontSize: "18px", color: "#6b7280" }}>Loading people...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
          People Management
        </h1>
        <p style={{ color: "#6b7280" }}>Manage church member information and celebration dates</p>
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
          <input
            type="text"
            placeholder="Search people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "14px",
              width: "200px",
            }}
          />

          {/* Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            style={{
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

        {/* Add Person Button */}
        <button
          onClick={() => toast.success("Add person feature coming soon!")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          <PlusIcon style={{ height: "16px", width: "16px" }} />
          Add Person
        </button>
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
            <UserIcon style={{ height: "24px", width: "24px", color: "#2563eb" }} />
            <div>
              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Total People</p>
              <p style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", margin: 0 }}>
                {people.filter((p) => p.active).length}
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
            <CalendarDaysIcon style={{ height: "24px", width: "24px", color: "#ec4899" }} />
            <div>
              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Birthdays</p>
              <p style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", margin: 0 }}>
                {people.filter((p) => p.active && p.event_type === "birthday").length}
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
              <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Anniversaries</p>
              <p style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", margin: 0 }}>
                {people.filter((p) => p.active && p.event_type === "anniversary").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* People Table */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f9fafb" }}>
              <tr>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Event Type
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Age/Years
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Phone
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPeople.map((person) => (
                <tr key={person.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "16px", fontSize: "14px", color: "#111827" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: person.event_type === "birthday" ? "#fce7f3" : "#f3e8ff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {person.event_type === "birthday" ? "🎂" : "💕"}
                      </div>
                      <div>
                        <div style={{ fontWeight: "500" }}>{person.name}</div>
                        {person.spouse && (
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>
                            Spouse: {person.spouse}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px", fontSize: "14px", color: "#111827" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                        backgroundColor: person.event_type === "birthday" ? "#fce7f3" : "#f3e8ff",
                        color: person.event_type === "birthday" ? "#be185d" : "#7c3aed",
                      }}
                    >
                      {person.event_type === "birthday" ? "Birthday" : "Anniversary"}
                    </span>
                  </td>
                  <td style={{ padding: "16px", fontSize: "14px", color: "#111827" }}>
                    {formatDate(person.event_date)}
                  </td>
                  <td style={{ padding: "16px", fontSize: "14px", color: "#111827" }}>
                    {calculateAge(person)
                      ? `${calculateAge(person)} ${
                          person.event_type === "birthday" ? "years old" : "years married"
                        }`
                      : "-"}
                  </td>
                  <td style={{ padding: "16px", fontSize: "14px", color: "#111827" }}>
                    {person.phone_number ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <PhoneIcon style={{ height: "14px", width: "14px", color: "#6b7280" }} />
                        {person.phone_number}
                      </div>
                    ) : (
                      <span style={{ color: "#9ca3af" }}>No phone</span>
                    )}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleEdit(person)}
                        style={{
                          padding: "6px",
                          backgroundColor: "#f3f4f6",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        <PencilIcon style={{ height: "14px", width: "14px", color: "#6b7280" }} />
                      </button>
                      <button
                        onClick={() => handleDelete(person)}
                        style={{
                          padding: "6px",
                          backgroundColor: "#fef2f2",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        <TrashIcon style={{ height: "14px", width: "14px", color: "#dc2626" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPeople.length === 0 && (
          <div
            style={{
              padding: "48px",
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            <UserIcon
              style={{ height: "48px", width: "48px", margin: "0 auto 16px", color: "#d1d5db" }}
            />
            <p style={{ fontSize: "16px", margin: 0 }}>
              {searchTerm || filterType !== "all"
                ? "No people match your search criteria"
                : "No people found"}
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingPerson && (
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
              maxWidth: "500px",
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
                marginBottom: "20px",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", margin: 0 }}>
                Edit Person
              </h3>
              <button
                onClick={() => setEditingPerson(null)}
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

            <div style={{ display: "grid", gap: "16px" }}>
              {/* Name */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "4px",
                  }}
                >
                  Name *
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                />
              </div>

              {/* Event Type */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "4px",
                  }}
                >
                  Event Type *
                </label>
                <select
                  value={editForm.event_type}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      event_type: e.target.value as "birthday" | "anniversary",
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                >
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                </select>
              </div>

              {/* Event Date */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "4px",
                  }}
                >
                  Event Date * (MM-DD format)
                </label>
                <input
                  type="text"
                  placeholder="03-15"
                  value={editForm.event_date}
                  onChange={(e) => setEditForm({ ...editForm, event_date: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                />
              </div>

              {/* Year */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "4px",
                  }}
                >
                  Year (Birth year or Marriage year)
                </label>
                <input
                  type="number"
                  placeholder="1990"
                  value={editForm.year}
                  onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                />
              </div>

              {/* Spouse (only for anniversaries) */}
              {editForm.event_type === "anniversary" && (
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Spouse Name
                  </label>
                  <input
                    type="text"
                    value={editForm.spouse}
                    onChange={(e) => setEditForm({ ...editForm, spouse: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>
              )}

              {/* Phone Number */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "4px",
                  }}
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+1234567890"
                  value={editForm.phone_number}
                  onChange={(e) => setEditForm({ ...editForm, phone_number: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button
                onClick={handleSaveEdit}
                style={{
                  flex: 1,
                  backgroundColor: "#2563eb",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingPerson(null)}
                style={{
                  flex: 1,
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingPerson && (
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
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: "0 0 8px 0",
                }}
              >
                Delete Person
              </h3>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                Are you sure you want to delete <strong>{deletingPerson.name}</strong>? This action
                cannot be undone.
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={confirmDelete}
                style={{
                  flex: 1,
                  backgroundColor: "#dc2626",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
              <button
                onClick={() => setDeletingPerson(null)}
                style={{
                  flex: 1,
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
