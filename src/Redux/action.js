
export const addEvent = (event) => ({
    type: 'ADD_EVENT',
    payload: event,
  });
  
  export const updateEvent = (event) => ({
    type: 'UPDATE_EVENT',
    payload: event,
  });
  
  export const deleteEvent = (eventId) => ({
    type: 'DELETE_EVENT',
    payload: eventId,
  });