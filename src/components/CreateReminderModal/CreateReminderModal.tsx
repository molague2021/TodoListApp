import {useState, useEffect} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Container } from '@mui/material';
import { useSaveTodoItem } from '../../hook/useSaveTodoItem';
import { useContext } from 'react';
import TodoContext from '../../context/TodoContext';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'


const labels = [{ id: 1, name: 'Bills'},{ id: 2, name: 'Home'},{ id: 3, name: 'Personal'}];

type TodoItem = {
  name: string;
  date: string;
  labels: string[];
}

interface CreateReminderModalProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

export const CreateReminderModal = ({ open, setIsOpen }: CreateReminderModalProps) => {
  const [todoItem, setTodoItem] = useState<TodoItem>({
    name: '',
    date: '',
    labels: labels.map((label) => label.name)
  });
  const [reminderName, setReminderName] = useState('');
  const [startDate, setStartDate] = useState<Dayjs>();

  const {mutate} = useSaveTodoItem();

  const onReminderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItem({
      ...todoItem,
      name: e.target.value,
    })
  }

  const onDateChange = (date: Dayjs) => {
    console.log(date);
    setStartDate(date)
  }

  useEffect(() => {
    if(startDate){
      console.log('useEffect: ', startDate.format('YYYY-MM-DD'));
      setTodoItem({
        ...todoItem,
        date: startDate.format('YYYY-MM-DD'),
      })
    }
  }, [startDate])

  useEffect(() => {
    console.log('todo: ', todoItem)
  }, [todoItem])

  const onSubmit = () => {
    
    setIsOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Typography sx={{}}>Create Reminder</Typography>
        <IconButton aria-label="close" onClick={() => setIsOpen(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
          <div className="input-group">
            <input
              onChange={onReminderNameChange}
              type="text"
              value={todoItem.name}
              placeholder="Reminder name"
            />
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container sx={{marginTop: '20px'}}>
              <DatePicker
                label={'Due Date'}
                value={startDate}
                onChange={(date) => onDateChange(date)}
              />
            </Container>
          </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color='success' autoFocus onClick={onSubmit}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
