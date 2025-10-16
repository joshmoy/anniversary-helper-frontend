"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BellIcon from "@/components/icons/BellIcon";
import MailIcon from "@/components/icons/MailIcon";
import GlobeIcon from "@/components/icons/GlobeIcon";
import ZapIcon from "@/components/icons/ZapIcon";

type WorkingDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export default function SettingsPage() {
  // Notification Preferences State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [reminderTiming, setReminderTiming] = useState("1 week before");
  const [dailySummary, setDailySummary] = useState(true);

  // Message Templates State
  const [birthdayTemplate, setBirthdayTemplate] = useState("");
  const [anniversaryTemplate, setAnniversaryTemplate] = useState("");

  // Organization Settings State
  const [organizationName, setOrganizationName] = useState("My Organization");
  const [timeZone, setTimeZone] = useState("Eastern Time (ET)");
  const [workingDays, setWorkingDays] = useState<WorkingDay[]>([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ]);

  const allDays: WorkingDay[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleWorkingDay = (day: WorkingDay) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSaveTemplates = () => {
    console.log("Saving templates:", { birthdayTemplate, anniversaryTemplate });
    // TODO: Implement API call
  };

  const handleSaveSettings = () => {
    console.log("Saving settings:", { organizationName, timeZone, workingDays });
    // TODO: Implement API call
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium text-text-primary tracking-tight">
          Settings
        </h1>
        <p className="text-body text-text-secondary">
          Manage your notification preferences and integrations
        </p>
      </div>

      {/* Settings Cards Container */}
      <div className="flex flex-col gap-6">
        {/* Notification Preferences Card */}
        <Card className="rounded-[14px] border border-black/10">
          <CardHeader className="gap-2 pb-6">
            <div className="flex items-center gap-2">
              <BellIcon width={20} height={20} color="#2563eb" />
              <h2 className="text-base font-normal text-text-primary tracking-tight leading-4">
                Notification Preferences
              </h2>
            </div>
            <p className="text-body text-label-text">
              Configure how and when you receive reminders
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <Label className="text-sm font-medium text-text-primary tracking-tight leading-[14px]">
                  Email Notifications
                </Label>
                <p className="text-small text-text-secondary">
                  Receive celebration reminders via email
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            {/* Separator */}
            <div className="h-px bg-black/10" />

            {/* SMS Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <Label className="text-sm font-medium text-text-primary tracking-tight leading-[14px]">
                  SMS Notifications
                </Label>
                <p className="text-small text-text-secondary">
                  Receive text message reminders
                </p>
              </div>
              <Switch
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
            </div>

            {/* Separator */}
            <div className="h-px bg-black/10" />

            {/* Reminder Timing */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-text-primary tracking-tight leading-[14px]">
                Reminder Timing
              </Label>
              <Select value={reminderTiming} onValueChange={setReminderTiming}>
                <SelectTrigger className="bg-input-background border-none h-9 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 day before">1 day before</SelectItem>
                  <SelectItem value="3 days before">3 days before</SelectItem>
                  <SelectItem value="1 week before">1 week before</SelectItem>
                  <SelectItem value="2 weeks before">2 weeks before</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Separator */}
            <div className="h-px bg-black/10" />

            {/* Daily Summary */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-text-primary tracking-tight leading-[14px]">
                Daily Summary
              </Label>
              <div className="flex items-center justify-between">
                <p className="text-small text-text-secondary">
                  Receive daily summary of upcoming celebrations
                </p>
                <Switch checked={dailySummary} onCheckedChange={setDailySummary} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Templates Card */}
        <Card className="rounded-[14px] border border-black/10">
          <CardHeader className="gap-2 pb-6">
            <div className="flex items-center gap-2">
              <MailIcon width={20} height={20} color="#2563eb" />
              <h2 className="text-base font-normal text-text-primary tracking-tight leading-4">
                Message Templates
              </h2>
            </div>
            <p className="text-body text-label-text">
              Customize your celebration messages
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {/* Birthday Message Template */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-text-primary tracking-tight leading-[14px]">
                Birthday Message Template
              </Label>
              <Textarea
                placeholder="Enter your birthday message template..."
                value={birthdayTemplate}
                onChange={(e) => setBirthdayTemplate(e.target.value)}
                className="min-h-[60px] bg-input-background border-none resize-none"
              />
            </div>

            {/* Anniversary Message Template */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-text-primary tracking-tight leading-[14px]">
                Anniversary Message Template
              </Label>
              <Textarea
                placeholder="Enter your anniversary message template..."
                value={anniversaryTemplate}
                onChange={(e) => setAnniversaryTemplate(e.target.value)}
                className="min-h-[60px] bg-input-background border-none resize-none"
              />
            </div>

            {/* Save Templates Button */}
            <Button
              onClick={handleSaveTemplates}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm tracking-tight w-fit"
            >
              Save Templates
            </Button>
          </CardContent>
        </Card>

        {/* Organization Settings Card */}
        <Card className="rounded-[14px] border border-black/10">
          <CardHeader className="gap-2 pb-6">
            <div className="flex items-center gap-2">
              <GlobeIcon width={20} height={20} color="#2563eb" />
              <h2 className="text-base font-normal text-text-primary tracking-tight leading-4">
                Organization Settings
              </h2>
            </div>
            <p className="text-body text-label-text">
              General settings for your account
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {/* Organization/Team Name */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-text-primary tracking-tight leading-[14px]">
                Organization/Team Name
              </Label>
              <Input
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="bg-input-background border-none h-9"
              />
            </div>

            {/* Time Zone */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-text-primary tracking-tight leading-[14px]">
                Time Zone
              </Label>
              <Select value={timeZone} onValueChange={setTimeZone}>
                <SelectTrigger className="bg-input-background border-none h-9 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eastern Time (ET)">Eastern Time (ET)</SelectItem>
                  <SelectItem value="Central Time (CT)">Central Time (CT)</SelectItem>
                  <SelectItem value="Mountain Time (MT)">Mountain Time (MT)</SelectItem>
                  <SelectItem value="Pacific Time (PT)">Pacific Time (PT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Working Days */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-text-primary tracking-tight leading-[14px]">
                Working Days
              </Label>
              <div className="flex gap-2">
                {allDays.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleWorkingDay(day)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium tracking-tight transition-colors ${
                      workingDays.includes(day)
                        ? "bg-blue-600 text-white"
                        : "bg-input-background text-text-primary hover:bg-gray-300"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Settings Button */}
            <Button
              onClick={handleSaveSettings}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm tracking-tight w-fit"
            >
              Save Settings
            </Button>
          </CardContent>
        </Card>

        {/* Integration Options Card */}
        <Card className="rounded-[14px] border border-black/10">
          <CardHeader className="gap-2 pb-6">
            <div className="flex items-center gap-2">
              <ZapIcon width={17} height={18} color="#2563eb" />
              <h2 className="text-base font-normal text-text-primary tracking-tight leading-4">
                Integration Options
              </h2>
            </div>
            <p className="text-body text-label-text">Connect external services</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Email Service */}
            <div className="flex items-center justify-between p-4 rounded-[10px] border border-template-card-border">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-normal text-text-primary tracking-tight">
                  Email Service
                </h3>
                <p className="text-small text-text-secondary">
                  Configure SMTP settings for sending emails
                </p>
              </div>
              <Button
                variant="outline"
                className="text-sm font-medium text-text-primary tracking-tight"
              >
                Configure
              </Button>
            </div>

            {/* SMS Service */}
            <div className="flex items-center justify-between p-4 rounded-[10px] border border-template-card-border">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-normal text-text-primary tracking-tight">
                  SMS Service
                </h3>
                <p className="text-small text-text-secondary">
                  Connect Twilio or similar service for SMS
                </p>
              </div>
              <Button
                variant="outline"
                className="text-sm font-medium text-text-primary tracking-tight"
              >
                Configure
              </Button>
            </div>

            {/* Calendar Integration */}
            <div className="flex items-center justify-between p-4 rounded-[10px] border border-template-card-border">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-normal text-text-primary tracking-tight">
                  Calendar Integration
                </h3>
                <p className="text-small text-text-secondary">
                  Sync with Google Calendar or Outlook
                </p>
              </div>
              <Button
                variant="outline"
                className="text-sm font-medium text-text-primary tracking-tight"
              >
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}