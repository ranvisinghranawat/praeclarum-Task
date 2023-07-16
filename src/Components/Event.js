import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent } from '../Redux/action';

const EventForm = ({ event }) => {
  const [eventName, setEventName] = useState(event ? event.name : '');
  const [eventType, setEventType] = useState(event ? event.type : '');
  const [startDate, setStartDate] = useState(event ? new Date(event.startDate) : null);
  const [endDate, setEndDate] = useState(event ? new Date(event.endDate) : null);
  const [description, setDescription] = useState(event ? event.description : '');
  const [handledBy, setHandledBy] = useState(event ? event.handledBy : '');
  const [organisation, setOrganisation] = useState(event ? event.organisation : '');
  const [subEvents, setSubEvents] = useState(event ? event.subEvents : 0);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const updatedEvent = {
        id: event ? event.id : Date.now(),
        name: eventName,
        type: eventType,
        startDate,
        endDate,
        description,
        handledBy,
        organisation,
        subEvents,
      };

      if (event) {
        dispatch(updateEvent(updatedEvent));
      } else {
        dispatch(addEvent(updatedEvent));
      }

      setEventName('');
      setEventType('');
      setStartDate(null);
      setEndDate(null);
      setDescription('');
      setHandledBy('');
      setOrganisation('');
      setSubEvents(0);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!eventName) {
      errors.eventName = 'Event Name is required';
    }

    if (!eventType) {
      errors.eventType = 'Event Type is required';
    }

    if (!startDate) {
      errors.startDate = 'Start Date is required';
    }

    if (!endDate) {
      errors.endDate = 'End Date is required';
    }

    if (startDate && endDate && startDate > endDate) {
      errors.endDate = 'End Date must be after Start Date';
    }

    if (subEvents < 0) {
      errors.subEvents = 'Total Number of Sub-Events must be a positive number';
    }

    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="eventName">Event Name</label>
        <input
          type="text"
          id="eventName"
          className={`form-control ${errors.eventName ? 'is-invalid' : ''}`}
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        {errors.eventName && <div className="invalid-feedback">{errors.eventName}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="eventType">Event Type</label>
        <select
          id="eventType"
          className={`form-control ${errors.eventType ? 'is-invalid' : ''}`}
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="">Select event type</option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="general">General</option>
          <option value="children">Children</option>
          <option value="school">School</option>
        </select>
        {errors.eventType && <div className="invalid-feedback">{errors.eventType}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Event Start Date</label>
        <input
          type="date"
          id="startDate"
          className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
          value={startDate ? startDate.toISOString().split('T')[0] : ''}
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
        {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="endDate">Event End Date</label>
        <input
          type="date"
          id="endDate"
          className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
          value={endDate ? endDate.toISOString().split('T')[0] : ''}
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
        {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Event Description</label>
        <textarea
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="handledBy">Event Handled By</label>
        <input
          type="text"
          id="handledBy"
          className="form-control"
          value={handledBy}
          onChange={(e) => setHandledBy(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="organisation">Event Organisation</label>
        <input
          type="text"
          id="organisation"
          className="form-control"
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="subEvents">Total Number of Sub-Events</label>
        <input
          type="number"
          id="subEvents"
          className={`form-control ${errors.subEvents ? 'is-invalid' : ''}`}
          value={subEvents}
          onChange={(e) => setSubEvents(parseInt(e.target.value))}
        />
        {errors.subEvents && <div className="invalid-feedback">{errors.subEvents}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default EventForm;
