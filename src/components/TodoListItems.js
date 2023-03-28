import { useEffect, useState, useContext } from 'react';
import TodoContext from '../context/TodoContext';
import { FaTimes, FaEdit, FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';
import { Spinner } from '../shared/Spinner';
import Card from '../shared/Card';
import { useGetTodoItem } from '../hook/useGetTodoItem';
import { motion, AnimatePresence } from 'framer-motion';
import './TodoListItems.css';

function TodoListItems() {
	//const { todoList, isLoading } = useContext(TodoContext);
	const { data: todoList, isLoading } = useGetTodoItem();

	console.log('data from query: ', todoList);

	if (!isLoading && (!todoList || todoList.length === 0)) {
		return <p>No Items have been created.</p>;
	}

	//Checkmark the completed items in the List
	const handleCheck = (id) => {
		// setTodoItem((todoItem) =>
		//   todoItem.map((selectedItem) => {
		//     if (selectedItem.id === id) {
		//       return {
		//         ...selectedItem,
		//         complete: !selectedItem.complete,
		//       };
		//     }
		//     return selectedItem;
		//   })
		// );
	};

	const handleEdit = (id) => {
		//console.log('edit');
	};

	const handleDelete = (id) => {
		// if (window.confirm('Are you sure you want to delete?')) {
		//   setTodoItem(todoItem.filter((item) => item.id !== id));
		// }
	};

	// useEffect(() => {
	//   console.log('Calling use effect');
	// }, [todoItem]);

	return isLoading ? (
		<Spinner />
	) : (
		<>
			{todoList?.map((item) => (
				<Card>
					<div key={item.id}>
						<button className='close' onClick={() => handleDelete(item.id)}>
							<FaTimes />
						</button>
						<button className='edit' onClick={() => handleEdit(item.id)}>
							<FaEdit />
						</button>
						<div style={{ display: 'flex' }}>
							<button
								className='circle'
								type='checked'
								onClick={() => handleCheck(item.id)}
							>
								{!item.complete ? (
									<FaRegCircle />
								) : (
									<FaRegCheckCircle style={{ color: 'green' }} />
								)}
							</button>
							<div>
								<div className='text-display'>{item.name}</div>
								<div className='date'>{item.date}</div>
							</div>
							<div className='category-text'>
								{item.category.map((category) => (
									<div className='category'>
										<p style={{ marginBottom: '5px' }}>{category}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</Card>
			))}
		</>
	);
}

export default TodoListItems;
