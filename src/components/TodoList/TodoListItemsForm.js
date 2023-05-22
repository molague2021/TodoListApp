import { useState } from 'react';
import CreateReminderModal from '../../shared/CreateReminderModal';
import TodoListItem from './TodoListItem/TodoListItem';
import { ListContainer } from '../../shared/ListContainer';
import { Spinner } from '../../shared/Spinner';

function TodoListForm({ isLoading, todoList, setIsOpen, handleEditTodoItem }) {
  const handleCreateReminder = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const onEditTodoItem = (e, todoItem) => {
    console.log('Edit Todo');
    e.preventDefault();
    handleEditTodoItem(todoItem);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <ListContainer
      name="Todo List"
      displayButton={true}
      buttonName="Create reminder"
      onClick={handleCreateReminder}
    >
      <TodoListItem todoList={todoList} onEditTodoItem={onEditTodoItem} />
    </ListContainer>
  );
}

export default TodoListForm;
