import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEvent, updateEvent } from '../Redux/action';

const EventList = () => {
  const events = useSelector((state) => state.events);
  const [filterType, setFilterType] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [editedEvent, setEditedEvent] = useState(null);
  const dispatch = useDispatch();

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleEditEvent = (id) => {
    const eventToEdit = events.find((event) => event.id === id);
    setEditedEvent(eventToEdit);
  };

  const handleSaveEvent = (updatedEvent) => {
    dispatch(updateEvent(updatedEvent));
    setEditedEvent(null);
  };

  const handleCancelEdit = () => {
    setEditedEvent(null);
  };

  const handleDeleteEvent = (id) => {
    dispatch(deleteEvent(id));
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

  const sortedEvents = React.useMemo(() => {
    const sortedData = [...filteredEvents];
    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        const aValue = String(a[sortConfig.key]).toLowerCase() || '';
        const bValue = String(b[sortConfig.key]).toLowerCase() || '';
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortedData;
  }, [filteredEvents, sortConfig]);

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
        </select>
      </div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th onClick={() => handleSort('name')}>
              Event Name
              {sortConfig.key === 'name' && (
                <span>{sortConfig.direction === 'asc' ? ' ⬆️' : ' ⬇️'}</span>
              )}
            </th>
            <th onClick={() => handleSort('type')}>
              Event Type
              {sortConfig.key === 'type' && (
                <span>{sortConfig.direction === 'asc' ? ' ⬆️' : ' ⬇️'}</span>
              )}
            </th>
            <th onClick={() => handleSort('startDate')}>
              Start Date
              {sortConfig.key === 'startDate' && (
                <span>{sortConfig.direction === 'asc' ? ' ⬆️' : ' ⬇️'}</span>
              )}
            </th>
            <th onClick={() => handleSort('endDate')}>
              End Date
              {sortConfig.key === 'endDate' && (
                <span>{sortConfig.direction === 'asc' ? ' ⬆️' : ' ⬇️'}</span>
              )}
            </th>
            <th>Description</th>
            <th>Handled By</th>
            <th>Organisation</th>
            <th>Sub-Events</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedEvents.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.type}</td>
              <td>{event.startDate ? new Date(event.startDate).toLocaleDateString() : ''}</td>
              <td>{event.endDate ? new Date(event.endDate).toLocaleDateString() : ''}</td>
              <td>{event.description}</td>
              <td>{event.handledBy}</td>
              <td>{event.organisation}</td>
              <td>{event.subEvents}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEditEvent(event.id)}>
                  Edit
                </button>
                <button className="btn btn-danger ml-2" onClick={() => handleDeleteEvent(event.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editedEvent && (
        <EditEventForm event={editedEvent} onSave={handleSaveEvent} onCancel={handleCancelEdit} />
      )}
    </div>
  );
};

const EditEventForm = ({ event, onSave, onCancel }) => {
  const [eventName, setEventName] = useState(event.name);
  const [eventType, setEventType] = useState(event.type);
  const [startDate, setStartDate] = useState(event.startDate);
  const [endDate, setEndDate] = useState(event.endDate);
  const [description, setDescription] = useState(event.description);
  const [handledBy, setHandledBy] = useState(event.handledBy);
  const [organisation, setOrganisation] = useState(event.organisation);
  const [subEvents, setSubEvents] = useState(event.subEvents);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...event,
      name: eventName,
      type: eventType,
      startDate,
      endDate,
      description,
      handledBy,
      organisation,
      subEvents,
    };
    onSave(updatedEvent);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="eventName">Event Name</label>
        <input
          type="text"
          id="eventName"
          className="form-control"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="eventType">Event Type</label>
        <select
          id="eventType"
          className="form-control"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="general">General</option>
          <option value="children">Children</option>
          <option value="school">School</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="handledBy">Handled By</label>
        <input
          type="text"
          id="handledBy"
          className="form-control"
          value={handledBy}
          onChange={(e) => setHandledBy(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="organisation">Organisation</label>
        <input
          type="text"
          id="organisation"
          className="form-control"
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="subEvents">Sub-Events</label>
        <input
          type="number"
          id="subEvents"
          className="form-control"
          value={subEvents}
          onChange={(e) => setSubEvents(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EventList;
