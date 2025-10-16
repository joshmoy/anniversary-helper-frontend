"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/api";
import type { Person } from "@/types";
import { format, startOfMonth, endOfMonth } from "date-fns";
import toast from "react-hot-toast";
import ViewToggle from "@/components/celebrations/ViewToggle";
import TabNavigation from "@/components/celebrations/TabNavigation";
import CelebrationCard from "@/components/celebrations/CelebrationCard";
import CalendarGrid from "@/components/celebrations/CalendarGrid";

export default function CelebrationsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [celebrations, setCelebrations] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<"all" | "birthday" | "anniversary">("all");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  useEffect(() => {
    loadCelebrations();
  }, [selectedDate, viewMode]);

  const loadCelebrations = async () => {
    try {
      setLoading(true);
      if (viewMode === "list") {
        // Load celebrations for the selected date
        const dateStr = format(selectedDate, "MM-dd");
        const data = await apiClient.getCelebrationsForDate(dateStr);
        setCelebrations(data);
      } else {
        // Load celebrations for the entire month
        const monthStart = startOfMonth(selectedDate);
        const monthEnd = endOfMonth(selectedDate);
        
        // Fetch all celebrations for each day in the month
        const allCelebrations: Person[] = [];
        const currentDate = new Date(monthStart);
        
        while (currentDate <= monthEnd) {
          const dateStr = format(currentDate, "MM-dd");
          try {
            const data = await apiClient.getCelebrationsForDate(dateStr);
            allCelebrations.push(...data);
          } catch (error) {
            // Continue even if one date fails
            console.error(`Error loading celebrations for ${dateStr}:`, error);
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        setCelebrations(allCelebrations);
      }
    } catch (error) {
      console.error("Error loading celebrations:", error);
      toast.error("Failed to load celebrations");
    } finally {
      setLoading(false);
    }
  };

  const filteredCelebrations = celebrations.filter((person) => {
    return filterType === "all" || person.event_type === filterType;
  });

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
    <div className="p-8 bg-[#f9fafb] min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium tracking-tight text-[#101828] mb-2">
            Celebrations
          </h1>
          <p className="text-base font-normal tracking-tight text-[#4a5565]">
            View and manage upcoming celebrations
          </p>
        </div>
        <ViewToggle view={viewMode} onViewChange={setViewMode} />
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <TabNavigation activeTab={filterType} onTabChange={setFilterType} />
      </div>

      {/* Content */}
      {viewMode === "list" ? (
        <div className="space-y-4">
          {filteredCelebrations.length > 0 ? (
            filteredCelebrations.map((person) => (
              <CelebrationCard key={person.id} person={person} />
            ))
          ) : (
            <div className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.10)] p-12 text-center">
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
      ) : (
        <CalendarGrid
          celebrations={filteredCelebrations}
          currentDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      )}
    </div>
  );
}