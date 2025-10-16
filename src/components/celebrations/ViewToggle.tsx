import ListIcon from "../icons/ListIcon";
import CalendarViewIcon from "../icons/CalendarViewIcon";

interface ViewToggleProps {
  view: "list" | "calendar";
  onViewChange: (view: "list" | "calendar") => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onViewChange("list")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium tracking-tight transition-colors ${
          view === "list"
            ? "bg-[#030213] text-white"
            : "bg-white text-[#0a0a0a] border border-[rgba(0,0,0,0.10)]"
        }`}
      >
        <ListIcon width={16} height={16} color={view === "list" ? "#ffffff" : "#0a0a0a"} />
        List
      </button>
      <button
        onClick={() => onViewChange("calendar")}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium tracking-tight transition-colors ${
          view === "calendar"
            ? "bg-[#030213] text-white"
            : "bg-white text-[#0a0a0a] border border-[rgba(0,0,0,0.10)]"
        }`}
      >
        <CalendarViewIcon width={16} height={16} color={view === "calendar" ? "#ffffff" : "#0a0a0a"} />
        Calendar
      </button>
    </div>
  );
}