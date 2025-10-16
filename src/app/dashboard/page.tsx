"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/api";
import type { Person, HealthStatus } from "@/types";
import StatCard from "@/components/dashboard/StatCard";
import StatusItem from "@/components/dashboard/StatusItem";
import CelebrationItem from "@/components/dashboard/CelebrationItem";
import UsersStatsIcon from "@/components/icons/UsersStatsIcon";
import CalendarStatsIcon from "@/components/icons/CalendarStatsIcon";
import BirthdayCakeIcon from "@/components/icons/BirthdayCakeIcon";
import HeartStatsIcon from "@/components/icons/HeartStatsIcon";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon";
import CheckCircleBlueIcon from "@/components/icons/CheckCircleBlueIcon";
import AlertCircleIcon from "@/components/icons/AlertCircleIcon";

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const activePeople = allPeople.filter((p) => p.active);
  const upcomingBirthdays = activePeople.filter((p) => p.event_type === "birthday");
  const upcomingAnniversaries = activePeople.filter((p) => p.event_type === "anniversary");

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium text-text-primary tracking-tight">Dashboard</h1>
        <p className="text-body text-text-secondary">
          Welcome to your Celebration Management Hub
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          label="Total Contacts"
          value={activePeople.length}
          icon={<UsersStatsIcon width={24} height={24} color="#3b82f6" />}
          iconBgColor="bg-blue-50"
        />
        <StatCard
          label="Today's Celebrations"
          value={todaysCelebrations.length}
          icon={<CalendarStatsIcon width={24} height={24} color="#f97316" />}
          iconBgColor="bg-orange-50"
        />
        <StatCard
          label="Upcoming Birthdays"
          value={upcomingBirthdays.length}
          icon={<BirthdayCakeIcon width={24} height={24} color="#ec4899" />}
          iconBgColor="bg-pink-50"
        />
        <StatCard
          label="Upcoming Anniversaries"
          value={upcomingAnniversaries.length}
          icon={<HeartStatsIcon width={22} height={19} color="#9810fa" />}
          iconBgColor="bg-purple-50"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Status Card */}
        <div className="bg-white rounded-[14px] border border-black/10 p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-base font-medium text-text-primary tracking-tight leading-4">
              System Status
            </h2>
            <p className="text-body text-label-text">
              Reminder system and notifications
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <StatusItem
              icon={<CheckCircleIcon width={20} height={20} color="#10b981" />}
              title="Reminder System"
              subtitle="Active and running"
              badge="Active"
              bgColor="bg-status-active-bg"
              borderColor="border-status-active-border"
              badgeColor="bg-green-600 text-status-active-text"
            />
            <StatusItem
              icon={<CheckCircleBlueIcon width={20} height={20} color="#3b82f6" />}
              title="Email Notifications"
              subtitle="Configured and enabled"
              badge="Enabled"
              bgColor="bg-status-enabled-bg"
              borderColor="border-status-enabled-border"
              badgeColor="bg-blue-600 text-status-enabled-text"
            />
            <StatusItem
              icon={<AlertCircleIcon width={20} height={20} color="#f59e0b" />}
              title="SMS Notifications"
              subtitle="Configuration needed"
              badge="Setup Required"
              bgColor="bg-status-warning-bg"
              borderColor="border-status-warning-border"
              badgeColor="bg-orange-600 text-status-warning-text"
            />
          </div>
        </div>

        {/* Today's Celebrations Card */}
        <div className="bg-white rounded-[14px] border border-black/10 p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-base font-medium text-text-primary tracking-tight leading-4">
              Today's Celebrations
            </h2>
            <p className="text-body text-label-text">
              People celebrating today
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {todaysCelebrations.length > 0 ? (
              todaysCelebrations.map((person) => (
                <CelebrationItem
                  key={person.id}
                  emoji={person.event_type === "birthday" ? "🎂" : "💕"}
                  name={person.name}
                  type={person.event_type === "birthday" ? "Birthday" : "Work Anniversary"}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-text-secondary">No celebrations today</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}