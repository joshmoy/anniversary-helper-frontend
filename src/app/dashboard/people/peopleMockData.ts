import { EventType, RelationshipType, StatusType } from '@/types';

export const mockRootProps = {
  contacts: [
    {
      id: 1,
      name: "Sarah Johnson",
      relationship: RelationshipType.Employee,
      eventType: EventType.Birthday,
      eventDate: new Date("2025-10-06"),
      email: "sarah.j@company.com",
      phone: "+1 234-567-8901",
      status: StatusType.Active
    },
    {
      id: 2,
      name: "Michael Chen",
      relationship: RelationshipType.TeamMember,
      eventType: EventType.WorkAnniversary,
      eventDate: new Date("2025-10-06"),
      email: "michael.c@company.com",
      phone: "+1 234-567-8902",
      status: StatusType.Active
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      relationship: RelationshipType.Employee,
      eventType: EventType.Birthday,
      eventDate: new Date("2025-10-15"),
      email: "emily.r@company.com",
      phone: "+1 234-567-8903",
      status: StatusType.Active
    },
    {
      id: 4,
      name: "James Wilson",
      relationship: RelationshipType.Client,
      eventType: EventType.Birthday,
      eventDate: new Date("2025-10-20"),
      email: "james.w@client.com",
      phone: null,
      status: StatusType.Active
    },
    {
      id: 5,
      name: "Lisa Anderson",
      relationship: RelationshipType.TeamMember,
      eventType: EventType.WorkAnniversary,
      eventDate: new Date("2025-10-25"),
      email: "lisa.a@company.com",
      phone: "+1 234-567-8905",
      status: StatusType.Active
    },
    {
      id: 6,
      name: "David Kim",
      relationship: RelationshipType.Friend,
      eventType: EventType.Birthday,
      eventDate: new Date("2025-11-02"),
      email: "david.kim@email.com",
      phone: null,
      status: StatusType.Active
    },
    {
      id: 7,
      name: "Maria Garcia",
      relationship: RelationshipType.Family,
      eventType: EventType.Anniversary,
      eventDate: new Date("2025-11-10"),
      email: "maria.g@email.com",
      phone: "+1 234-567-8907",
      status: StatusType.Active
    },
    {
      id: 8,
      name: "Robert Taylor",
      relationship: RelationshipType.Employee,
      eventType: EventType.Birthday,
      eventDate: new Date("2025-11-18"),
      email: "robert.t@company.com",
      phone: null,
      status: StatusType.Active
    }
  ]
};