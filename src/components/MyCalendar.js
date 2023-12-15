import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import '../App.css';

const MyCalendar = ({ style, highlightedDates, events }) => {
  const localizer = momentLocalizer(moment);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Update the calendar events whenever the events prop changes
    if (events && events.length > 0) {
      setCalendarEvents(
        events.map(event => ({
          title: event.item,
          start: new Date(event.date),
          end: new Date(event.date),
        }))
      );
    } else {
      // If events is undefined or empty, set calendarEvents to an empty array
      setCalendarEvents([]);
    }
  }, [events]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const eventStartDate = moment(event.start).format('YYYY-MM-DD');
    const isHighlighted = highlightedDates.includes(eventStartDate);
    return {
      className: isHighlighted ? 'highlighted-event' : '',
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="calendar-container" style={{...style, marginLeft: 'auto' }}>
      <div className="calendar-header">
        {selectedEvent && <p>Selected Event: {selectedEvent.title}</p>}
      </div>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ width: 300, height: 450}}
        className="calendar"
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent} 
        showMultiDayTimes={false}
      />
    </div>
  );
};

export default MyCalendar;
