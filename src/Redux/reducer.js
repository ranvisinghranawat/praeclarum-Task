
const initialState = {
    events: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_EVENT':
        return {
          ...state,
          events: [...state.events, action.payload],
        };
      case 'UPDATE_EVENT':
        return {
          ...state,
          events: state.events.map((event) =>
            event.id === action.payload.id ? action.payload : event
          ),
        };
      case 'DELETE_EVENT':
        return {
          ...state,
          events: state.events.filter((event) => event.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default reducer;