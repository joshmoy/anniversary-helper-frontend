"use client";

import type { Contact } from "@/types";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ContactRow } from "./ContactRow";

interface ContactsTableProps {
  contacts: Contact[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function ContactsTable({ contacts, onEdit, onDelete }: ContactsTableProps) {
  return (
    <div className="border border-table-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-table-border bg-white hover:bg-white">
            <TableHead className="text-table-header py-3">Name</TableHead>
            <TableHead className="text-table-header py-3">Relationship</TableHead>
            <TableHead className="text-table-header py-3">Event Type</TableHead>
            <TableHead className="text-table-header py-3">Date</TableHead>
            <TableHead className="text-table-header py-3">Contact Info</TableHead>
            <TableHead className="text-table-header py-3">Status</TableHead>
            <TableHead className="text-table-header py-3">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <ContactRow
              key={contact.id}
              contact={contact}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}