import { Ticket, User } from '@acme/shared-models';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { queryClient } from '../app';
import TicketAssignee from './assignee/assignee';

export function TicketDetails() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const query = useQuery<{
    ticket: Ticket;
    assignee: User;
    possibleAssignees: User[];
  }>({
    queryKey: ['tickets/details', params.id],
    queryFn: async () => {
      const response = await fetch('/api/tickets/details/' + params.id);
      if (response.status !== 200) {
        alert('Failed to find ticket, please try using a valid id.');
      }
      return response.json();
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      // would likely want to paginate this somehow
      fetch('/api/tickets/' + params.id + '/complete', {
        method: query.data?.ticket.completed ? 'delete' : 'put',
      }),
    onSuccess: () => {
      // could optimistically update if wanted
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['tickets', params.id] });
    },
    onError: () => alert('Failed to create ticket, please try again.'),
  });

  return (
    <div className="border rounded px-4 py-3">
      <Button onClick={() => navigate('/')}>Back to Ticket List</Button>
      <div className="flex justify-between mt-4">
        <h1 className="text-xl font-bold mb-2">Ticket ID: {params.id}</h1>
        {query.data && (
          <Button onClick={() => mutate()} disabled={isPending}>
            Mark {query.data?.ticket.completed ? 'Incomplete' : 'Complete'}
          </Button>
        )}
      </div>
      <h2 className="text-lg font-bold">Description</h2>
      <p>{query.data?.ticket.description}</p>
      <h2 className="text-lg font-bold">Status</h2>
      {query.data && (
        <p
          className={
            query.data.ticket.completed ? 'text-green-600' : 'text-red-600'
          }
        >
          {query.data?.ticket.completed ? 'Complete' : 'Incomplete'}
        </p>
      )}
      {query.data && (
        <TicketAssignee
          assignee={query.data?.assignee}
          possibleAssignees={query.data?.possibleAssignees}
        />
      )}
    </div>
  );
}

export default TicketDetails;
