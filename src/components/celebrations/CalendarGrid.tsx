import { useState, useEffect } from "react";
import type { Person } from "@/types";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import CalendarCell from "./CalendarCell";

interface CalendarGridProps {
  celebrations: Person[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export default function CalendarGrid({
  celebrations,
  currentDate,
  onDateChange,
}: CalendarGridProps) {
  const [viewDate, setViewDate] = useState(currentDate);

  useEffect(() => {
    setViewDate(currentDate);
  }, [currentDate]);

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the day of week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = monthStart.getDay();

  // Create empty cells for days before the month starts
  const emptyCells = Array(firstDayOfWeek).fill(null);

  // Check if a date has celebrations
  const getCelebrationsForDate = (date: Date) => {
    const dateStr = format(date, "MM-dd");
    return celebrations.filter((person) => person.event_date === dateStr);
  };

  const handlePreviousMonth = () => {
    const newDate = subMonths(viewDate, 1);
    setViewDate(newDate);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = addMonths(viewDate, 1);
    setViewDate(newDate);
    onDateChange(newDate);
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.10)] p-6">
      {/* Month Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-base font-normal tracking-tight leading-4 text-[#0a0a0a]">
          {format(viewDate, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePreviousMonth}
            className="px-3 py-1 text-sm text-[#0a0a0a] hover:bg-gray-100 rounded-lg transition-colors"
          >
            ←
          </button>
          <button
            onClick={handleNextMonth}
            className="px-3 py-1 text-sm text-[#0a0a0a] hover:bg-gray-100 rounded-lg transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Week day headers */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-normal tracking-tight text-[#4a5565] pb-4"
          >
            {day}
          </div>
        ))}

        {/* Empty cells before month starts */}
        {emptyCells.map((_, index) => (
          <div
            key={`empty-${index}`}
            className="aspect-square bg-[#f9fafb] rounded-[10px] border border-[rgba(0,0,0,0.10)]"
          />
        ))}

        {/* Calendar days */}
        {daysInMonth.map((day) => {
          const dayCelebrations = getCelebrationsForDate(day);
          return (
            <CalendarCell
              key={day.toISOString()}
              date={day}
              celebrations={dayCelebrations}
              isToday={isSameDay(day, new Date())}
            />
          );
        })}
      </div>
    </div>
  );
}