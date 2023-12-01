export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: string;
  assigneeId: null | number;
  completed: boolean;
};

export const TicketStatusFilter = {
  complete: 'complete',
  incomplete: 'incomplete',
} as const;

export type TicketStatusFilter = keyof typeof TicketStatusFilter;

export type GetTicketsEndpoint = {
  request: {
    status: TicketStatusFilter;
  };
  response: {
    body: Ticket[];
  };
};
