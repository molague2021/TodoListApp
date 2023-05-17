import { useState } from 'react';
import CreateReminderModal from '../../shared/CreateReminderModal';
import TodoListItems from './TodoListItems';
import { ListContainer } from '../../shared/ListContainer';

function TodoListForm({ setIsOpen, handleEditTodoItem }) {
  const handleCreateReminder = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const onEditTodoItem = (e, todoItem) => {
    console.log('Edit Todo');
    e.preventDefault();
    handleEditTodoItem(todoItem);
  };

  return (
    <ListContainer
      name="Todo List"
      displayButton={true}
      buttonName="Create reminder"
      onClick={handleCreateReminder}
    >
      <TodoListItems onEditTodoItem={onEditTodoItem} />
    </ListContainer>
  );
}

export default TodoListForm;
