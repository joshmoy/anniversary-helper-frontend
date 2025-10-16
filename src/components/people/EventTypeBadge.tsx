"use client";

import { Badge } from "@/components/ui/badge";
import { EventType } from "@/types";
import { cn } from "@/lib/utils";

interface EventTypeBadgeProps {
  eventType: EventType;
}

export function EventTypeBadge({ eventType }: EventTypeBadgeProps) {
  const getBadgeStyles = () => {
    switch (eventType) {
      case EventType.Birthday:
        return "bg-event-birthday-bg text-event-birthday-text border-0";
      case EventType.WorkAnniversary:
        return "bg-event-work-anniversary-bg text-event-work-anniversary-text border-0";
      case EventType.Anniversary:
        return "bg-event-anniversary-bg text-event-anniversary-text border-0";
      default:
        return "";
    }
  };

  return (
    <Badge className={cn("text-badge rounded-[4px] px-2 py-1", getBadgeStyles())}>
      {eventType}
    </Badge>
  );
}