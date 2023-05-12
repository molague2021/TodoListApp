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
import { useSaveTodoItem } from '../../hook/useSaveTodoItem';
import { TodoItem } from '../../TodoItem.interface';
import { useContext } from 'react';
import TodoContext from '../../context/TodoContext';

interface CreateReminderModalProps {
	open: boolean;
	setIsOpen: (open: boolean) => void;
	todoItem: TodoItem;
}

export const CreateReminderModal = ({
	open,
	setIsOpen,
	todoItem,
}: CreateReminderModalProps) => {
	const todoItemRef = useRef(todoItem);
	console.log(todoItemRef);
	const [reminderName, setReminderName] = useState<string>();
	const [startDate, setStartDate] = useState<Dayjs>();

	// useEffect(() => {
	// 	if (todoItemRef.current.date) {
	// 		setStartDate(dayjs(todoItemRef.current.date));
	// 	}
	// }, [todoItemRef.current.date]);

	// useEffect(() => {
	// 	setReminderName(todoItemRef.current.name);
	// }, [todoItemRef.current.name]);

	const { mutate: saveTodoItem } = useSaveTodoItem();

	const onReminderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		todoItemRef.current = {
			...todoItemRef.current,
			name: e.target.value,
		};
		setReminderName(e.target.value);
	};

	const onDateChange = (date: Dayjs) => {
		console.log(date);
		setStartDate(date);
	};

	useEffect(() => {
		if (startDate) {
			console.log('useEffect: ', startDate);
			todoItemRef.current = {
				...todoItemRef.current,
				date: startDate.format('YYYY/MM/DD'),
			};
		}
	}, [startDate]);

	const onSubmit = () => {
		saveTodoItem(
			{
				todoItemPayload: todoItem,
				todoItemId: '',
			},
			{
				onSuccess: () => {
					setIsOpen(false);
				},
			}
		);
	};

	const onCancel = () => {
		setIsOpen(false);
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
				<IconButton aria-label='close' onClick={() => setIsOpen(false)}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers>
				<div className='input-group'>
					<TextField
						variant={'outlined'}
						onChange={onReminderNameChange}
						type='text'
						value={reminderName}
						placeholder='Reminder name'
					/>
				</div>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Container sx={{ marginTop: '20px' }}>
						<DatePicker
							label={'Due Date'}
							value={startDate}
							onChange={(date) => onDateChange(date)}
						/>
					</Container>
				</LocalizationProvider>
			</DialogContent>
			<DialogActions>
				<Button
					variant='contained'
					color='primary'
					autoFocus
					onClick={onCancel}
				>
					Cancel
				</Button>
				<Button
					variant='contained'
					color='primary'
					autoFocus
					onClick={onSubmit}
				>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};
