import type { ReactNode } from "react";

interface StatusItemProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  badge: string;
  bgColor: string;
  borderColor: string;
  badgeColor: string;
}

export default function StatusItem({
  icon,
  title,
  subtitle,
  badge,
  bgColor,
  borderColor,
  badgeColor,
}: StatusItemProps) {
  return (
    <div className={`${bgColor} ${borderColor} border rounded-[10px] p-4 flex items-center justify-between gap-3`}>
      <div className="flex items-center gap-3">
        {icon}
        <div className="flex flex-col">
          <p className="text-body text-text-primary">{title}</p>
          <p className="text-small text-text-secondary">{subtitle}</p>
        </div>
      </div>
      <span className={`${badgeColor} text-badge px-3 py-1 rounded-md`}>
        {badge}
      </span>
    </div>
  );
}