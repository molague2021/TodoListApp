import { useState, useEffect } from 'react';
import '../App.css';
import dayjs from 'dayjs';

import TodoListForm from './TodoList/TodoListItemsForm';
import TodoListItems from './TodoList/TodoListItem/TodoListItem';
import { TodoItem } from '../TodoItem.interface';
import { CreateReminderModal } from './CreateReminderModal/CreateReminderModal';
import Header from './Header';
import { Labels, TodoItemDefault } from '../constants/constants';
import { CompletedList } from './CompletedList/CompletedList';
import { useGetTodoItem } from '../hook/useGetTodoItem';
import { useSaveTodoItem } from '../hook/useSaveTodoItem';

export const TodoList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [completedList, setCompleteList] = useState<TodoItem[]>();
  const [todoList, setTodoList] = useState<TodoItem[]>();
  const { data, isLoading } = useGetTodoItem();
  const { mutate: saveTodoItem } = useSaveTodoItem();
  const [todoItemToEdit, setTodoItemToEdit] = useState<TodoItem | null>(
    TodoItemDefault
  );

  const handleSubmit = (todoItem: TodoItem) => {
    saveTodoItem(
      {
        todoItemPayload: todoItem,
        todoItemId: todoItem?.id?.toString() ?? '',
      },
      {
        onSuccess: () => {
          handleCloseModal();
        },
      }
    );
  };

  const handleCheckChange = (todoItem: TodoItem) => {
    saveTodoItem(
      {
        todoItemPayload: todoItem,
        todoItemId: todoItem?.id?.toString() ?? '',
      },
      {
        onSuccess: () => {
          handleCloseModal();
        },
      }
    );
  };

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

  useEffect(() => {
    if (data?.length > 0) {
      const completeList = data.filter((item) => item.complete);
      const todoList = data.filter((item) => !item.complete);
      setCompleteList(completeList);
      setTodoList(todoList);
    }
  }, [data]);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <TodoListForm
          isLoading={isLoading}
          todoList={todoList}
          setIsOpen={setIsOpen}
          handleEditTodoItem={handleEditTodoItem}
        />
        <CompletedList isLoading={isLoading} todoList={completedList} />
        {/* <TodoListItems /> */}
      </div>
      <CreateReminderModal
        open={isOpen}
        handleNameChange={handleNameChange}
        handleDateChange={handleDateChange}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        todoItem={todoItemToEdit}
      />
    </div>
  );
};
