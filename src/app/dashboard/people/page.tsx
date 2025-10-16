"use client";

import { useEffect, useState, useMemo } from "react";
import { apiClient } from "@/lib/api/api";
import type { Person } from "@/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import SearchIcon from "@/components/icons/SearchIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import EditIcon from "@/components/icons/EditIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import {
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function PeoplePage() {
  const router = useRouter();

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "birthday" | "anniversary">("all");
  const [relationshipFilter, setRelationshipFilter] = useState<string>("all");
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

  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (person.phone_number && person.phone_number.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = filterType === "all" || person.event_type === filterType;
      return matchesSearch && matchesFilter && person.active;
    });
  }, [people, searchTerm, filterType]);

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

  const getEventTypeBadgeStyles = (eventType: string) => {
    switch (eventType) {
      case "birthday":
        return "bg-event-birthday-bg text-event-birthday-text border-0";
      case "anniversary":
        return "bg-event-anniversary-bg text-event-anniversary-text border-0";
      default:
        return "bg-event-work-anniversary-bg text-event-work-anniversary-text border-0";
    }
  };

  const getEventTypeLabel = (eventType: string) => {
    if (eventType === "birthday") return "Birthday";
    if (eventType === "anniversary") return "Anniversary";
    return "Work Anniversary";
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-8 p-8 bg-bg-light min-h-screen">
        <div className="flex justify-center items-center h-48">
          <div className="text-lg text-gray-500">Loading contacts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-8 bg-bg-light min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-[24px] font-medium tracking-[0.07px] text-text-primary">
              People & Contacts
            </h1>
            <p className="text-body text-text-secondary">
              Manage your contact list and celebrations
            </p>
          </div>
          
          <Button
            onClick={() => router.push("/dashboard/upload")}
            className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white rounded-lg gap-2 px-4 py-2 h-9"
          >
            <PlusIcon width={16} height={16} color="#ffffff" />
            <span className="text-sm font-medium tracking-tight">Add Contact</span>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <SearchIcon 
              width={16} 
              height={16} 
              color="#717182" 
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            />
            <Input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-small"
            />
          </div>
          
          <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
            <SelectTrigger className="w-48 bg-input-background rounded-lg">
              <SelectValue placeholder="All Events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="birthday">Birthday</SelectItem>
              <SelectItem value="anniversary">Anniversary</SelectItem>
            </SelectContent>
          </Select>

          <Select value={relationshipFilter} onValueChange={setRelationshipFilter}>
            <SelectTrigger className="w-52 bg-input-background rounded-lg">
              <SelectValue placeholder="All Relationships" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Relationships</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
              <SelectItem value="team member">Team Member</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="friend">Friend</SelectItem>
              <SelectItem value="family">Family</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="border border-table-border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-table-border bg-white hover:bg-white">
              <TableHead className="text-table-header py-3">Name</TableHead>
              <TableHead className="text-table-header py-3">Relationship</TableHead>
              <TableHead className="text-table-header py-3">Event Type</TableHead>
              <TableHead className="text-table-header py-3">Date</TableHead>
              <TableHead className="text-table-header py-3">Contact Info</TableHead>
              <TableHead className="text-table-header py-3">Status</TableHead>
              <TableHead className="text-table-header py-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPeople.map((person) => (
              <TableRow key={person.id} className="border-b border-table-border">
                <TableCell className="text-table-cell py-4">{person.name}</TableCell>
                <TableCell className="text-table-cell-capitalize py-4">
                  {person.spouse ? "family" : "employee"}
                </TableCell>
                <TableCell className="py-4">
                  <Badge className={cn("text-badge rounded-[4px] px-2 py-1", getEventTypeBadgeStyles(person.event_type))}>
                    {getEventTypeLabel(person.event_type)}
                  </Badge>
                </TableCell>
                <TableCell className="text-table-cell py-4">{formatDate(person.event_date)}</TableCell>
                <TableCell className="py-4">
                  {person.phone_number ? (
                    <div className="flex flex-col gap-1">
                      <span className="text-table-cell">{person.name.toLowerCase().replace(' ', '.')}@company.com</span>
                      <span className="text-table-cell-secondary">{person.phone_number}</span>
                    </div>
                  ) : (
                    <span className="text-table-cell">{person.name.toLowerCase().replace(' ', '.')}@company.com</span>
                  )}
                </TableCell>
                <TableCell className="py-4">
                  <Badge className="bg-status-active-badge-bg text-status-active-badge-text border-0 text-badge rounded-[4px] px-2 py-1">
                    active
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleEdit(person)}
                      className="hover:opacity-70 transition-opacity"
                      aria-label="Edit contact"
                    >
                      <EditIcon width={16} height={16} color="var(--action-edit-color)" />
                    </button>
                    <button
                      onClick={() => handleDelete(person)}
                      className="hover:opacity-70 transition-opacity"
                      aria-label="Delete contact"
                    >
                      <DeleteIcon width={16} height={16} color="var(--action-delete-color)" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredPeople.length === 0 && (
          <div className="py-12 text-center text-gray-600">
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
