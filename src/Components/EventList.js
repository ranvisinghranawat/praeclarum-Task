import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const EventList = () => {
  const events = useSelector((state) => state.events);
  const [filterType, setFilterType] = useState('');

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const filteredEvents = React.useMemo(() => {
    let filteredData = [...events];
    if (filterType) {
      filteredData = filteredData.filter((event) =>
        event.type.toLowerCase().includes(filterType.toLowerCase())
      );
    }
    return filteredData;
  }, [events, filterType]);

  return (
    <div className="table-responsive">
      <div className="mb-3">
        <label htmlFor="filterType" className="form-label">
          Filter by Event Type:
        </label>
        <select
          id="filterType"
          className="form-control"
          value={filterType}
          onChange={handleFilterTypeChange}
        >
          <option value="">Select event type</option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="general">General</option>
          <option value="children">Children</option>
          <option value="school">School</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Event Name</th>
            <th>Event Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Handled By</th>
            <th>Organisation</th>
            <th>Sub-Events</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.type}</td>
              <td>{event.startDate?.toLocaleDateString()}</td>
              <td>{event.endDate?.toLocaleDateString()}</td>
              <td>{event.description}</td>
              <td>{event.handledBy}</td>
              <td>{event.organisation}</td>
              <td>{event.subEvents}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
