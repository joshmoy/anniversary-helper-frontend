"use client";

import type { Contact } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { EventTypeBadge } from "./EventTypeBadge";
import { StatusBadge } from "./StatusBadge";
import EditIcon from "@/components/icons/EditIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";

interface ContactRowProps {
  contact: Contact;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function ContactRow({ contact, onEdit, onDelete }: ContactRowProps) {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <TableRow className="border-b border-table-border">
      <TableCell className="text-table-cell py-4">{contact.name}</TableCell>
      <TableCell className="text-table-cell-capitalize py-4">{contact.relationship}</TableCell>
      <TableCell className="py-4">
        <EventTypeBadge eventType={contact.eventType} />
      </TableCell>
      <TableCell className="text-table-cell py-4">{formatDate(contact.eventDate)}</TableCell>
      <TableCell className="py-4">
        {contact.phone ? (
          <div className="flex flex-col gap-1">
            <span className="text-table-cell">{contact.email}</span>
            <span className="text-table-cell-secondary">{contact.phone}</span>
          </div>
        ) : (
          <span className="text-table-cell">{contact.email}</span>
        )}
      </TableCell>
      <TableCell className="py-4">
        <StatusBadge status={contact.status} />
      </TableCell>
      <TableCell className="py-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => onEdit(contact.id)}
            className="hover:opacity-70 transition-opacity"
            aria-label="Edit contact"
          >
            <EditIcon width={16} height={16} color="var(--action-edit-color)" />
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="hover:opacity-70 transition-opacity"
            aria-label="Delete contact"
          >
            <DeleteIcon width={16} height={16} color="var(--action-delete-color)" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}