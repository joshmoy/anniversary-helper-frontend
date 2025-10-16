import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  iconBgColor: string;
}

export default function StatCard({ label, value, icon, iconBgColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-[14px] border border-black/10 p-6 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-small text-text-secondary">{label}</p>
        <p className="text-stat text-text-primary">{value}</p>
      </div>
      <div className={`${iconBgColor} rounded-lg p-3 flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  );
}