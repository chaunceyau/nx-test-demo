import { Ticket, TicketStatusFilter } from '@acme/shared-models';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { useState } from 'react';
import StatusFilter from './status-filter/status-filter';

export function TicketsPage() {
  const [statusFilter, setStatusFilter] = useState<
    TicketStatusFilter | undefined
  >();
  const [searchValue, setSearchValue] = useState<string>('');

  const query = useQuery<Ticket[]>({
    queryKey: ['tickets', statusFilter, searchValue],
    queryFn: () => {
      const params = new URLSearchParams();
      if (statusFilter) {
        params.append('status', statusFilter);
      }
      if (searchValue) {
        params.append('term', searchValue);
      }

      let endpoint = '/api/tickets';
      if (params) {
        endpoint += '?' + params;
      }

      return fetch(endpoint, {}).then((r) => r.json());
    },
  });

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-4">
      <Button onClick={() => navigate('/create')}>Create New Ticket</Button>
      <h2 className="text-indigo-600 font-bold text-lg">Tickets</h2>
      <StatusFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <div>
        <input
          className="border rounded"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      {query.data?.length === 0 && <p>No tickets match your filters...</p>}
      {query.isLoading && <p>fetching tickets...</p>}
      {query.data && (
        <ul>
          {query.data.map((t) => (
            <li key={t.id}>
              <Link to={`/${t.id}`}>
                Ticket: {t.id}, {t.description}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TicketsPage;
