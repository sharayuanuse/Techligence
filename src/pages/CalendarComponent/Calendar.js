import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEventForm from './AddEventForm.js';

const Calendar = ({ user }) => {
  const [events, setEvents] = useState([]);
  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={(eventInfo) => (
          <div style={{ backgroundColor: eventInfo.event.extendedProps.color }}>
            <span>{eventInfo.event.title}</span>
          </div>
        )}
      />
      {user.role === 'teacher' && <AddEventForm onAddEvent={handleAddEvent} />}
    </div>
  );
};

export default Calendar;
