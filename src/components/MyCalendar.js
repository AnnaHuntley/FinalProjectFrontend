import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const MyCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  // Example events data
  const initialEvents = [
    {
      title: 'Event 1',
      start: new Date(2023, 10, 10, 10, 0),
      end: new Date(2023, 10, 10, 12, 0),
    },
    // Add more events as needed
  ];

  useEffect(() => {
    // Load initial events when the component mounts
    setEvents(initialEvents);
  }, []);

  const handleAddEvent = (newEvent) => {
    // Add the new event to the events array
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      {/* Your other UI components */}
    </div>
  );
};

export default MyCalendar;
