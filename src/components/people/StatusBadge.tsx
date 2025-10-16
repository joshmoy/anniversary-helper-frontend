"use client";

import { Badge } from "@/components/ui/badge";
import { StatusType } from "@/types";

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge className="bg-status-active-badge-bg text-status-active-badge-text border-0 text-badge rounded-[4px] px-2 py-1">
      {status}
    </Badge>
  );
}