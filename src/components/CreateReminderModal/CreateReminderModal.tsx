import { useState, useEffect } from 'react';
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
import { useContext } from 'react';
import TodoContext from '../../context/TodoContext';

const labels = [
	{ id: 1, name: 'Bills' },
	{ id: 2, name: 'Home' },
	{ id: 3, name: 'Personal' },
];

export type TodoItem = {
	name: string;
	date: string;
	category: string[];
	complete: boolean;
};

interface CreateReminderModalProps {
	open: boolean;
	setIsOpen: (open: boolean) => void;
}

export const CreateReminderModal = ({
	open = false,
	setIsOpen,
}: CreateReminderModalProps) => {
	const [todoItem, setTodoItem] = useState<TodoItem>({
		name: '',
		date: '',
		category: labels.map((label) => label.name),
		complete: false,
	});
	const [reminderName, setReminderName] = useState('');
	const [startDate, setStartDate] = useState<Dayjs>();

	const { mutate: saveTodoItem } = useSaveTodoItem();

	const onReminderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTodoItem({
			...todoItem,
			name: e.target.value,
		});
	};

	const onDateChange = (date: Dayjs) => {
		console.log(date);
		setStartDate(date);
	};

	useEffect(() => {
		if (startDate) {
			console.log('useEffect: ', startDate.format('YYYY-MM-DD'));
			setTodoItem({
				...todoItem,
				date: startDate.format('YYYY-MM-DD'),
			});
		}
	}, [startDate]);

	useEffect(() => {
		console.log('todo: ', todoItem);
	}, [todoItem]);

	const onSubmit = () => {
		saveTodoItem(
			{ todoItem },
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
						value={todoItem.name}
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
