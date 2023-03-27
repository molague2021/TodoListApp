import React, { useState } from 'react';
import './CreateReminderModal.css';
import { RiCloseLine } from 'react-icons/ri';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Container } from '@mui/material';

function CreateReminderModal({ setIsOpen }) {
  const [reminder, setReminder] = useState('');
  const [startDate, setStartDate] = useState();

  const handleCancel = () => {
    console.log('Cancelling the creationg of a todo Item.');
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form');
    console.log(reminder);
  };

  const handleChange = (e) => {
    setReminder(e.target.value);
    console.log(reminder);
  };

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <form onSubmit={handleSubmit} className="modal">
          <div className="modalHeader">
            <h5 className="heading">Create Reminder</h5>
          </div>
          <button className="closeBtn" onClick={() => handleCancel()}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className="modalContent">
            Are you sure you want to delete the item?
          </div>
          <div className="input-group">
            <input
              onChange={handleChange}
              type="text"
              value={reminder}
              placeholder="Create a Reminder"
            />
          </div>
          {/* <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container component={'DatePicker'}>
              <DatePicker
                label={'Due Date'}
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
            </Container>
          </LocalizationProvider>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="cancelBtn">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateReminderModal;
