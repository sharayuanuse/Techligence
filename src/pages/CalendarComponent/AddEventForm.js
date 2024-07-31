import React, { useState } from "react";

const AddEventForm = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [color, setColor] = useState('#000000'); // Default color

  const handleSubmit = () => {
    if (title && date) {
      onAddEvent({ title, start: date, color });
      setTitle('');
      setDate('');
      setColor('#000000'); // Reset to default color
    }
  };

  return (
    <div className="mt-2">
      <input
        className="soft-input m-1"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="soft-input m-1"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="color"
        className="soft-input m-1"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button className="soft-button m-1" onClick={handleSubmit}>
        Add Event
      </button>
    </div>
  );
};

export default AddEventForm;
