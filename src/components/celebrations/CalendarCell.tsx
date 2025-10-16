import type { Person } from "@/types";
import { format } from "date-fns";

interface CalendarCellProps {
  date: Date;
  celebrations: Person[];
  isToday: boolean;
}

export default function CalendarCell({ date, celebrations, isToday }: CalendarCellProps) {
  const hasCelebrations = celebrations.length > 0;
  const dayNumber = format(date, "d");

  return (
    <div
      className={`aspect-square rounded-[10px] border p-3 flex flex-col ${
        hasCelebrations
          ? "bg-[#e9d4ff] border-[rgba(0,0,0,0.10)]"
          : "bg-[#f9fafb] border-[rgba(0,0,0,0.10)]"
      }`}
    >
      <div className="text-sm font-normal tracking-tight text-[#0a0a0a]">{dayNumber}</div>
      {hasCelebrations && (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs">🎉</span>
        </div>
      )}
    </div>
  );
}