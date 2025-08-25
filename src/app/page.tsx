"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { Person, HealthStatus } from "@/types";
import { format } from "date-fns";
import {
  UsersIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [todaysCelebrations, setTodaysCelebrations] = useState<Person[]>([]);
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [healthData, celebrationsData, peopleData] = await Promise.all([
        apiClient.getHealth(),
        apiClient.getTodaysCelebrations(),
        apiClient.getPeople(),
      ]);

      setHealth(healthData);
      setTodaysCelebrations(celebrationsData);
      setAllPeople(peopleData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const activePeople = allPeople.filter((p) => p.active);
  const upcomingBirthdays = activePeople.filter((p) => p.event_type === "birthday");
  const upcomingAnniversaries = activePeople.filter((p) => p.event_type === "anniversary");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your Church Anniversary & Birthday Helper</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <UsersIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total People</p>
              <p className="text-2xl font-bold text-gray-900">{activePeople.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-8 w-8 text-amber-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Celebrations</p>
              <p className="text-2xl font-bold text-gray-900">{todaysCelebrations.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-8 w-8 text-pink-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Birthdays</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingBirthdays.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Anniversaries</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingAnniversaries.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Overall Health</span>
              <div className="flex items-center">
                {health?.status === "healthy" ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                )}
                <span
                  className={`font-medium ${
                    health?.status === "healthy" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {health?.status === "healthy" ? "Healthy" : "Unhealthy"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database</span>
              <span
                className={`font-medium ${
                  health?.database === "connected" ? "text-green-600" : "text-red-600"
                }`}
              >
                {health?.database || "Unknown"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Scheduler</span>
              <div className="flex items-center">
                {health?.scheduler?.is_running ? (
                  <ClockIcon className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                )}
                <span
                  className={`font-medium ${
                    health?.scheduler?.is_running ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {health?.scheduler?.is_running ? "Running" : "Stopped"}
                </span>
              </div>
            </div>

            {health?.scheduler?.next_run_time && (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Next Run</span>
                <span className="text-gray-900 font-medium">
                  {health.scheduler.schedule_time} {health.scheduler.timezone}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Today's Celebrations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Celebrations</h2>
          {todaysCelebrations.length > 0 ? (
            <div className="space-y-3">
              {todaysCelebrations.map((person) => (
                <div
                  key={person.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{person.name}</p>
                    <p className="text-sm text-gray-600 capitalize">
                      {person.event_type}
                      {person.year && ` • ${new Date().getFullYear() - person.year} years`}
                    </p>
                  </div>
                  <div className="text-2xl">{person.event_type === "birthday" ? "🎂" : "💕"}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarDaysIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No celebrations today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
