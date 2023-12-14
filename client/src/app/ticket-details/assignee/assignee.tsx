import { User } from '@acme/shared-models';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { queryClient } from '../../app';

export function TicketAssignee({
  assignee,
  possibleAssignees,
}: {
  assignee: User;
  possibleAssignees: User[];
}) {
  // const query = useQuery<User[]>({
  //   queryKey: ['users'],
  //   queryFn: () => fetch('/api/users').then((r) => r.json()),
  // });

  const params = useParams();

  const { mutate } = useMutation({
    mutationFn: ({ userId }: { userId: number }) => {
      const url =
        userId === -1
          ? '/api/tickets/' + params.id + '/unassign/'
          : '/api/tickets/' + params.id + '/assign/' + userId;
      return fetch(url, {
        method: 'put',
      });
    },
    onSuccess: () => {
      // could optimistically update if wanted
      queryClient.invalidateQueries({ queryKey: ['tickets', params.id] });
    },
    onError: () => alert('Failed to assign ticket, please try again.'),
  });

  return (
    <label className="block mb-4">
      <p className="font-bold text-lg">Select assignee:</p>
      {assignee && (
        <select
          name="assignee"
          onChange={(e) =>
            mutate({
              userId: parseInt(e.target.value),
            })
          }
        >
          <option value={-1}>Unassigned</option>
          {possibleAssignees.map((user) => (
            <option value={user.id} selected={assignee.id === user.id}>
              {user.name}
            </option>
          ))}
        </select>
      )}
    </label>
  );
}

export default TicketAssignee;
