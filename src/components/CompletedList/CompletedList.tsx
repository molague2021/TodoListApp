import React from 'react';
import { ListContainer } from '../../shared/ListContainer';
import TodoListItem from '../TodoList/TodoListItem/TodoListItem';
import { TodoList } from '../Todo';
import { Spinner } from '../../shared/Spinner';

export const CompletedList = ({ isLoading, todoList, onCheckChange }) => {
	if (!isLoading && (!todoList || todoList.length === 0)) {
		return <p>No Items have been created.</p>;
	}

	return isLoading ? (
		<Spinner />
	) : (
		<ListContainer name='Completed Items' displayButton={false}>
			<TodoListItem
				todoList={todoList}
				isCompleteList={true}
				onCheckChange={onCheckChange}
			/>
		</ListContainer>
	);
};
