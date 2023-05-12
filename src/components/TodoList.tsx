import { useState } from 'react';
import '../App.css';
import TodoListForm from './TodoListForm';
import TodoListItems from './TodoListItems';
import { TodoItem } from '../TodoItem.interface';
import { CreateReminderModal } from './CreateReminderModal/CreateReminderModal';
import Header from './Header';

const labels = [
	{ id: 1, name: 'Bills' },
	{ id: 2, name: 'Home' },
	{ id: 3, name: 'Personal' },
];

export const TodoList = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [todoItemToEdit, setTodoItemToEdit] = useState<TodoItem | null>();

	const handleEditTodoItem = (todoItem: TodoItem) => {
		console.log(todoItem);
		setTodoItemToEdit(todoItem);
		setIsOpen(true);
	};
	return (
		<div className='App'>
			<Header />
			<div className='container'>
				<TodoListForm
					setIsOpen={setIsOpen}
					handleEditTodoItem={handleEditTodoItem}
				/>
				{/* <TodoListItems /> */}
			</div>
			<CreateReminderModal
				open={isOpen}
				setIsOpen={setIsOpen}
				todoItem={todoItemToEdit}
			/>
		</div>
	);
};
