import { TicketStatusFilter } from '@acme/shared-models';

export function StatusFilter({
  statusFilter,
  setStatusFilter,
}: {
  statusFilter: TicketStatusFilter | undefined;
  setStatusFilter: React.Dispatch<
    React.SetStateAction<TicketStatusFilter | undefined>
  >;
}) {
  return (
    <label>
      Filter Status
      <select
        name="statusFilter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as TicketStatusFilter)}
      >
        <option value={undefined}>No Filter</option>
        <option value={TicketStatusFilter.complete}>
          {TicketStatusFilter.complete}
        </option>
        <option value={TicketStatusFilter.incomplete}>
          {TicketStatusFilter.incomplete}
        </option>
      </select>
    </label>
  );
}

export default StatusFilter;
