"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/api";
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
      <div className="p-8">
        <div className="flex justify-center items-center h-48">
          <div className="text-lg text-gray-500">Loading celebrations...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Celebrations</h1>
        <p className="text-gray-600">View celebrations for any date</p>
      </div>

      {/* Date Navigation */}
      <div className="card mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={goToPreviousDay}
              className="btn-secondary flex items-center gap-1"
              type="button"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Previous
            </button>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </h2>
              {isToday && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                  Today
                </span>
              )}
            </div>

            <button
              onClick={goToNextDay}
              className="btn-secondary flex items-center gap-1"
              type="button"
            >
              Next
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>

          <button onClick={goToToday} className="btn-primary" type="button">
            Today
          </button>
        </div>
      </div>

      {/* Stats and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Celebrations</p>
              <p className="text-2xl font-bold text-gray-900">{celebrations.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <CakeIcon className="h-8 w-8 text-pink-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Birthdays</p>
              <p className="text-2xl font-bold text-gray-900">{birthdayCount}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <HeartIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Anniversaries</p>
              <p className="text-2xl font-bold text-gray-900">{anniversaryCount}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <label className="block text-sm font-medium text-gray-600 mb-2">Filter</label>
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
      </div>

      {/* Celebrations List */}
      {filteredCelebrations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCelebrations.map((person) => (
            <div key={person.id} className="card hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    person.event_type === "birthday" ? "bg-pink-100" : "bg-purple-100"
                  }`}
                >
                  {person.event_type === "birthday" ? "🎂" : "💕"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{person.name}</h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        person.event_type === "birthday"
                          ? "bg-pink-100 text-pink-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {person.event_type === "birthday" ? "Birthday" : "Anniversary"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <CalendarDaysIcon className="h-4 w-4 mr-2" />
                      {formatCelebrationDate(person)}
                    </div>

                    {calculateAge(person) && (
                      <div className="flex items-center text-sm text-gray-600">
                        <UserIcon className="h-4 w-4 mr-2" />
                        {calculateAge(person)}{" "}
                        {person.event_type === "birthday" ? "years old" : "years married"}
                      </div>
                    )}

                    {person.spouse && (
                      <div className="flex items-center text-sm text-gray-600">
                        <HeartIcon className="h-4 w-4 mr-2" />
                        Spouse: {person.spouse}
                      </div>
                    )}

                    {person.phone_number && (
                      <div className="flex items-center text-sm text-gray-600">
                        <PhoneIcon className="h-4 w-4 mr-2" />
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
        <div className="card py-12 text-center">
          <CalendarDaysIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No celebrations</h3>
          <p className="text-gray-600">
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
