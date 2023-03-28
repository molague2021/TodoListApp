import { useState } from 'react';
import CreateReminderModal from '../shared/CreateReminderModal';
import TodoListItems from './TodoListItems';

function TodoListForm({ setIsOpen }) {
	const handleCreateReminder = (e) => {
		e.preventDefault();
		setIsOpen(true);
	};
	return (
		<div className='title'>
			<form>
				<div className='card-container'>
					<h2>Todo</h2>
					<div className='btn-container'>
						<button className='btn btn-primary' onClick={handleCreateReminder}>
							Create Reminder
						</button>
					</div>
				</div>
				<TodoListItems />
			</form>
		</div>
	);
}

export default TodoListForm;
