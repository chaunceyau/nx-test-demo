import {
  UnprocessableEntityException,
  Controller,
  Get,
  Put,
  Post,
  Param,
  Delete,
  Body,
  HttpCode,
  Query,
} from '@nestjs/common';
import { randomDelay } from '../utils/random-delay';
import { TicketsService } from './tickets.service';
import { TicketStatusFilter } from '@acme/shared-models';
import { UsersService } from '../users/users.service';

@Controller('tickets')
export class TicketsController {
  constructor(
    private ticketsService: TicketsService,
    private userService: UsersService
  ) {}

  @Get()
  async getTickets(
    @Query() query?: { status: TicketStatusFilter; term: string }
  ) {
    await randomDelay();
    return this.ticketsService.tickets(query);
  }

  @Get('details/:id')
  async getTicketDetailsPageInfo(@Param('id') id: string) {
    await randomDelay();
    const ticket = await this.ticketsService.ticket(Number(id));
    const users = await this.userService.users();
    if (ticket)
      return {
        ticket,
        possibleAssignees: users,
        assignee: users.find((u) => (u.id = ticket.assigneeId)),
      };
    throw new Error('this ticket does not exist');
  }

  @Get(':id')
  async getTicket(@Param('id') id: string) {
    await randomDelay();
    const ticket = await this.ticketsService.ticket(Number(id));
    if (ticket) return ticket;
    throw new Error('this ticket does not exist');
  }

  @Post()
  async createTicket(@Body() createDto: { description: string }) {
    await randomDelay();
    return this.ticketsService.newTicket(createDto);
  }

  @Put(':ticketId/assign/:userId')
  @HttpCode(204)
  async assignTicket(
    @Param('ticketId') ticketId: string,
    @Param('userId') userId: string
  ) {
    await randomDelay();
    const success = await this.ticketsService.assign(
      Number(ticketId),
      Number(userId)
    );
    if (!success) throw new UnprocessableEntityException();
  }

  @Put(':ticketId/unassign')
  @HttpCode(204)
  async unassignTicket(@Param('ticketId') ticketId: string) {
    await randomDelay();
    const success = await this.ticketsService.unassign(Number(ticketId));
    if (!success) throw new UnprocessableEntityException();
  }

  @Put(':id/complete')
  @HttpCode(204)
  async markAsComplete(@Param('id') ticketId: string) {
    await randomDelay();
    const success = await this.ticketsService.complete(Number(ticketId), true);
    if (!success) throw new UnprocessableEntityException();
  }

  @Delete(':id/complete')
  @HttpCode(204)
  async markAsIncomplete(@Param('id') ticketId: string) {
    await randomDelay();
    const success = await this.ticketsService.complete(Number(ticketId), false);
    if (!success) throw new UnprocessableEntityException();
  }
}
