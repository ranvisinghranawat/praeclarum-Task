import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './Redux/reducer';
import EventForm from './Components/Event';
import EventList from './Components/EventList';

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Add Event</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">View Events</Link>
            </li>
          </ul>
        </nav>

        <Routes>
      
        <Route path="/" element={<EventForm />} />
          <Route path="/events" element={<EventList />} />
        </Routes>
      </div>
    </Router>
  </Provider>
);

export default App;
