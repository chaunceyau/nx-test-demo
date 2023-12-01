import { Ticket } from '@acme/shared-models';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Button } from '../components/button';
import { queryClient } from '../app';
import TicketAssignee from './assignee/assignee';

export function TicketDetails() {
  const params = useParams<{ id: string }>();
  const query = useQuery<Ticket>({
    queryKey: ['tickets', params.id],
    queryFn: () => fetch('/api/tickets/' + params.id).then((r) => r.json()),
  });

  const { mutate ,isPending} = useMutation({
    mutationFn: () =>
      // would likely want to paginate this somehow
      fetch('/api/tickets/' + params.id + '/complete', {
        method: query.data?.completed ? 'delete' : 'put',
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
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-2">Ticket ID: {params.id}</h1>
        {query.data && (
          <Button onClick={() => mutate()} disabled={isPending}>
            Mark {query.data?.completed ? 'Incomplete' : 'Complete'}
          </Button>
        )}
      </div>
      <h2 className="text-lg font-bold">Description</h2>
      <p>{query.data?.description}</p>
      <h2 className="text-lg font-bold">Status</h2>
      {query.data && (
        <p className={query.data.completed ? 'text-green-600' : 'text-red-600'}>
          {query.data?.completed ? 'Complete' : 'Incomplete'}
        </p>
      )}
      <TicketAssignee assigneeId={query.data?.assigneeId} />
    </div>
  );
}

export default TicketDetails;
