import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import { UsersService } from '../users/users.service';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsService, UsersService],
    }).compile();

    service = module.get<TicketsService>(TicketsService);

    service['storedTickets'] = [
      {
        id: 1,
        description: 'Ticket 1',
        assigneeId: 1,
        completed: false,
      },
      {
        id: 2,
        description: 'Ticket 2',
        assigneeId: 1,
        completed: false,
      },
      {
        id: 3,
        description: 'Ticket 3',
        assigneeId: 2,
        completed: true,
      },
      {
        id: 4,
        description: 'Ticket 4',
        assigneeId: 2,
        completed: false,
      },
      {
        id: 5,
        description: 'Ticket 5',
        assigneeId: 3,
        completed: true,
      },
      {
        id: 6,
        description: 'Ticket 6',
        assigneeId: 3,
        completed: false,
      },
      {
        id: 7,
        description: 'Ticket 7',
        assigneeId: 1,
        completed: true,
      },
      {
        id: 8,
        description: 'Ticket 8',
        assigneeId: 2,
        completed: false,
      },
      {
        id: 9,
        description: 'Ticket 9',
        assigneeId: 3,
        completed: true,
      },
      {
        id: 10,
        description: 'Ticket 10',
        assigneeId: 1,
        completed: false,
      },
    ];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('tickets', () => {
    it('should return all tickets when no filters are provided', async () => {
      const result = await service.tickets();
      expect(result).toEqual(service['storedTickets']);
    });

    it('should return only completed tickets when "complete" filter is provided', async () => {
      const result = await service.tickets({ status: 'complete' });
      const completedTickets = service['storedTickets'].filter(
        (ticket) => ticket.completed
      );
      expect(result).toEqual(completedTickets);
    });

    it('should return only incomplete tickets when "incomplete" filter is provided', async () => {
      const result = await service.tickets({ status: 'incomplete' });
      const incompleteTickets = service['storedTickets'].filter(
        (ticket) => !ticket.completed
      );
      expect(result).toEqual(incompleteTickets);
    });
  });
});
