import { useState } from 'react';
import '../App.css';
import dayjs from 'dayjs';

import TodoListForm from './TodoListForm';
import TodoListItems from './TodoListItems';
import { TodoItem } from '../TodoItem.interface';
import { CreateReminderModal } from './CreateReminderModal/CreateReminderModal';
import Header from './Header';
import { Labels, TodoItemDefault } from '../constants/constants';

export const TodoList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [todoItemToEdit, setTodoItemToEdit] = useState<TodoItem | null>(
    TodoItemDefault
  );

  const handleNameChange = (name) => {
    setTodoItemToEdit({
      ...todoItemToEdit,
      name,
    });
  };

  const handleDateChange = (date) => {
    setTodoItemToEdit({ ...todoItemToEdit, date });
  };

  const handleEditTodoItem = (todoItem: TodoItem) => {
    console.log(todoItem);
    setTodoItemToEdit({ ...todoItem, date: dayjs(todoItem.date) });
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setTodoItemToEdit(TodoItemDefault);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <TodoListForm
          setIsOpen={setIsOpen}
          handleEditTodoItem={handleEditTodoItem}
        />
        {/* <TodoListItems /> */}
      </div>
      <CreateReminderModal
        open={isOpen}
        handleNameChange={handleNameChange}
        handleDateChange={handleDateChange}
        handleCloseModal={handleCloseModal}
        todoItem={todoItemToEdit}
      />
    </div>
  );
};
