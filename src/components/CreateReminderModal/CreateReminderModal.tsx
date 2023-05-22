import { useState, useEffect, useRef } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Typography,
  Container,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

import { TodoItem } from '../../TodoItem.interface';
import { useContext } from 'react';
import TodoContext from '../../context/TodoContext';

interface CreateReminderModalProps {
  open: boolean;
  handleNameChange: (value) => void;
  handleDateChange: (value) => void;
  handleCloseModal: () => void;
  handleSubmit: (todoItem) => void;
  todoItem: TodoItem;
}

export const CreateReminderModal = ({
  open,
  handleNameChange,
  handleDateChange,
  handleCloseModal,
  handleSubmit,
  todoItem,
}: CreateReminderModalProps) => {
  console.log(todoItem);
  //   const todoItemRef = useRef(todoItem);
  //   console.log(todoItemRef);
  const [startDate, setStartDate] = useState<Dayjs>();

  // useEffect(() => {
  // 	if (todoItemRef.current.date) {
  // 		setStartDate(dayjs(todoItemRef.current.date));
  // 	}
  // }, [todoItemRef.current.date]);

  // useEffect(() => {
  // 	setReminderName(todoItemRef.current.name);
  // }, [todoItemRef.current.name]);

  const onNameChange = (name) => {
    handleNameChange(name);
  };

  const onDateChange = (date: Dayjs) => {
    console.log(date);
    handleDateChange(date);
  };

  const onSubmit = () => {
    handleSubmit(todoItem);
  };

  const onCancel = () => {
    handleCloseModal();
  };

  return (
    <Dialog open={open}>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{}}>Create Reminder</Typography>
        <IconButton aria-label="close" onClick={handleCloseModal}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div className="input-group">
          <TextField
            variant={'outlined'}
            onChange={(e) => onNameChange(e.target.value)}
            type="text"
            value={todoItem.name}
            placeholder="Reminder name"
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Container sx={{ marginTop: '20px' }}>
            <DatePicker
              label={'Due Date'}
              value={todoItem.date}
              onChange={(date) => onDateChange(date)}
            />
          </Container>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          autoFocus
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          autoFocus
          onClick={onSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
