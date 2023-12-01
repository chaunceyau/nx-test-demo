import { Ticket } from '@acme/shared-models';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';

export function CreateTicketPage() {
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const { mutate } = useMutation<Ticket>({
    mutationFn: () =>
      // would likely want to paginate this somehow
      fetch('/api/tickets', {
        body: JSON.stringify({ description }),
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((r) => r.json()),
    onSuccess: (data) => {
      setDescription('');
      navigate('/' + data.id);
    },
    onError: () => alert('Failed to create ticket, please try again.'),
  });

  return (
    <div>
      <h1 className="mb-2">Create a new ticket</h1>
      <label className="block mb-2">
        <p className="font-bold">Description</p>
        <input
          value={description}
          className="border rounded px-2 py-1"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <Button type="submit" onClick={() => mutate()}>
        Create
      </Button>
    </div>
  );
}

export default CreateTicketPage;
