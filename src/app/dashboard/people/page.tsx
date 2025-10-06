"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/api";
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
import { useRouter } from "next/navigation";

export default function PeoplePage() {
  const router = useRouter();

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
      <div className="p-8">
        <div className="flex justify-center items-center h-48">
          <div className="text-lg text-gray-500">Loading people...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">People Management</h1>
        <p className="text-gray-600">Manage church member information and celebration dates</p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex gap-4 items-center">
          {/* Search */}
          <input
            type="text"
            placeholder="Search people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field w-48"
          />

          {/* Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="input-field"
          >
            <option value="all">All Events</option>
            <option value="birthday">Birthdays</option>
            <option value="anniversary">Anniversaries</option>
          </select>
        </div>

        {/* Add Person Button */}
        <button
          onClick={() => router.push("/upload")}
          className="btn-primary flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Add Person
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <div className="flex items-center">
            <UserIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total People</p>
              <p className="text-2xl font-bold text-gray-900">
                {people.filter((p) => p.active).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-8 w-8 text-pink-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Birthdays</p>
              <p className="text-2xl font-bold text-gray-900">
                {people.filter((p) => p.active && p.event_type === "birthday").length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Anniversaries</p>
              <p className="text-2xl font-bold text-gray-900">
                {people.filter((p) => p.active && p.event_type === "anniversary").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* People Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 border-b border-gray-200">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 border-b border-gray-200">
                  Event Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 border-b border-gray-200">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 border-b border-gray-200">
                  Age/Years
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 border-b border-gray-200">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPeople.map((person) => (
                <tr key={person.id} className="border-b border-gray-100">
                  <td className="px-4 py-4 text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          person.event_type === "birthday" ? "bg-pink-100" : "bg-purple-100"
                        }`}
                      >
                        {person.event_type === "birthday" ? "🎂" : "💕"}
                      </div>
                      <div>
                        <div className="font-medium">{person.name}</div>
                        {person.spouse && (
                          <div className="text-xs text-gray-600">Spouse: {person.spouse}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        person.event_type === "birthday"
                          ? "bg-pink-100 text-pink-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {person.event_type === "birthday" ? "Birthday" : "Anniversary"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {formatDate(person.event_date)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {calculateAge(person)
                      ? `${calculateAge(person)} ${
                          person.event_type === "birthday" ? "years old" : "years married"
                        }`
                      : "-"}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {person.phone_number ? (
                      <div className="flex items-center gap-1">
                        <PhoneIcon className="h-3.5 w-3.5 text-gray-500" />
                        {person.phone_number}
                      </div>
                    ) : (
                      <span className="text-gray-400">No phone</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(person)}
                        className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                      >
                        <PencilIcon className="h-3.5 w-3.5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(person)}
                        className="p-1.5 bg-red-50 hover:bg-red-100 rounded transition-colors"
                      >
                        <TrashIcon className="h-3.5 w-3.5 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPeople.length === 0 && (
          <div className="py-12 text-center text-gray-600">
            <UserIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-base">
              {searchTerm || filterType !== "all"
                ? "No people match your search criteria"
                : "No people found"}
            </p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold text-gray-900">Edit Person</h3>
              <button
                onClick={() => setEditingPerson(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-light"
              >
                ×
              </button>
            </div>

            <div className="grid gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="input-field"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
                <select
                  value={editForm.event_type}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      event_type: e.target.value as "birthday" | "anniversary",
                    })
                  }
                  className="input-field"
                >
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                </select>
              </div>

              {/* Event Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Date * (MM-DD format)
                </label>
                <input
                  type="text"
                  placeholder="03-15"
                  value={editForm.event_date}
                  onChange={(e) => setEditForm({ ...editForm, event_date: e.target.value })}
                  className="input-field"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year (Birth year or Marriage year)
                </label>
                <input
                  type="number"
                  placeholder="1990"
                  value={editForm.year}
                  onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                  className="input-field"
                />
              </div>

              {/* Spouse (only for anniversaries) */}
              {editForm.event_type === "anniversary" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Spouse Name
                  </label>
                  <input
                    type="text"
                    value={editForm.spouse}
                    onChange={(e) => setEditForm({ ...editForm, spouse: e.target.value })}
                    className="input-field"
                  />
                </div>
              )}

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+1234567890"
                  value={editForm.phone_number}
                  onChange={(e) => setEditForm({ ...editForm, phone_number: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={handleSaveEdit} className="btn-primary flex-1">
                Save Changes
              </button>
              <button onClick={() => setEditingPerson(null)} className="btn-secondary flex-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Person</h3>
              <p className="text-sm text-gray-600">
                Are you sure you want to delete <strong>{deletingPerson.name}</strong>? This action
                cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Delete
              </button>
              <button onClick={() => setDeletingPerson(null)} className="btn-secondary flex-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
