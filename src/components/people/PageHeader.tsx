"use client";

import { Button } from "@/components/ui/button";
import PlusIcon from "@/components/icons/PlusIcon";

interface PageHeaderProps {
  onAddContact: () => void;
}

export function PageHeader({ onAddContact }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-[24px] font-medium tracking-[0.07px] text-text-primary">
          People & Contacts
        </h1>
        <p className="text-body text-text-secondary">
          Manage your contact list and celebrations
        </p>
      </div>
      
      <Button
        onClick={onAddContact}
        className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white rounded-lg gap-2 px-4 py-2 h-9"
      >
        <PlusIcon width={16} height={16} color="#ffffff" />
        <span className="text-sm font-medium tracking-tight">Add Contact</span>
      </Button>
    </div>
  );
}