import type { Person } from "@/types";
import { format, isToday, differenceInDays } from "date-fns";

interface CelebrationCardProps {
  person: Person;
}

export default function CelebrationCard({ person }: CelebrationCardProps) {
  const getDateFromEventDate = (eventDate: string) => {
    const [month, day] = eventDate.split("-");
    const currentYear = new Date().getFullYear();
    return new Date(currentYear, parseInt(month) - 1, parseInt(day));
  };

  const celebrationDate = getDateFromEventDate(person.event_date);
  const isTodayCelebration = isToday(celebrationDate);
  const daysUntil = differenceInDays(celebrationDate, new Date());

  const getTimeBadge = () => {
    if (isTodayCelebration) {
      return (
        <span className="px-3 py-1 bg-[#9810fa] text-white text-xs font-medium rounded-lg whitespace-nowrap">
          Today! 🎉
        </span>
      );
    } else if (daysUntil > 0 && daysUntil <= 30) {
      return (
        <span className="text-[#0a0a0a] text-xs font-medium whitespace-nowrap">
          In {daysUntil} day{daysUntil !== 1 ? "s" : ""}
        </span>
      );
    }
    return null;
  };

  const emoji = person.event_type === "birthday" ? "🎂" : "💕";
  const borderColor = isTodayCelebration ? "#9810fa" : "rgba(0, 0, 0, 0.10)";

  return (
    <div
      className="flex items-center justify-between p-6 bg-white rounded-[14px] border"
      style={{ borderColor }}
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl leading-10 tracking-wide">{emoji}</div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-normal tracking-tight text-[#101828]">{person.name}</h3>
          <p className="text-base font-normal tracking-tight capitalize text-[#4a5565]">
            {person.event_type === "birthday" ? "Birthday" : "Work Anniversary"}
          </p>
          <p className="text-sm font-normal tracking-tight text-[#6a7282]">
            {format(celebrationDate, "MMM d, yyyy")}
          </p>
        </div>
      </div>
      {getTimeBadge()}
    </div>
  );
}