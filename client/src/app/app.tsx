import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import TicketsPage from './tickets/tickets';
import TicketDetailsPage from './ticket-details/ticket-details';
import CreateTicketPage from './create-ticket/create-ticket';

export const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="px-6 py-5 flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold">Ticketing App 👋</h1>
        <Routes>
          <Route path="/" element={<TicketsPage />} />
          <Route path="/create" element={<CreateTicketPage />} />
          <Route path="/:id" element={<TicketDetailsPage />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;
