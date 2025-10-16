"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SearchIcon from "@/components/icons/SearchIcon";
import { EventType, RelationshipType } from "@/types";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  eventTypeFilter: EventType | "all";
  onEventTypeChange: (value: string) => void;
  relationshipFilter: RelationshipType | "all";
  onRelationshipChange: (value: string) => void;
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  eventTypeFilter,
  onEventTypeChange,
  relationshipFilter,
  onRelationshipChange,
}: SearchAndFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <SearchIcon 
          width={16} 
          height={16} 
          color="#717182" 
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
        <Input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 text-small"
        />
      </div>
      
      <Select value={eventTypeFilter} onValueChange={onEventTypeChange}>
        <SelectTrigger className="w-48 bg-input-background rounded-lg">
          <SelectValue placeholder="All Events" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Events</SelectItem>
          <SelectItem value={EventType.Birthday}>{EventType.Birthday}</SelectItem>
          <SelectItem value={EventType.WorkAnniversary}>{EventType.WorkAnniversary}</SelectItem>
          <SelectItem value={EventType.Anniversary}>{EventType.Anniversary}</SelectItem>
        </SelectContent>
      </Select>

      <Select value={relationshipFilter} onValueChange={onRelationshipChange}>
        <SelectTrigger className="w-52 bg-input-background rounded-lg">
          <SelectValue placeholder="All Relationships" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Relationships</SelectItem>
          <SelectItem value={RelationshipType.Employee}>Employee</SelectItem>
          <SelectItem value={RelationshipType.TeamMember}>Team Member</SelectItem>
          <SelectItem value={RelationshipType.Client}>Client</SelectItem>
          <SelectItem value={RelationshipType.Friend}>Friend</SelectItem>
          <SelectItem value={RelationshipType.Family}>Family</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}