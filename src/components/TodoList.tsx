import { useState } from 'react';
import '../App.css';
import TodoListForm from './TodoListForm';
import TodoListItems from './TodoListItems';
import { CreateReminderModal } from './CreateReminderModal/CreateReminderModal';
import Header from './Header';

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

export const TodoList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [todoItem, setTodoItem] = useState<TodoItem>({
    name: '',
    date: '',
    category: labels.map((label) => label.name),
    complete: false,
  });
  return (
    <div className="App">
      <Header />
      <div className="container">
        <TodoListForm setIsOpen={setIsOpen} />
        {/* <TodoListItems /> */}
      </div>
      <CreateReminderModal open={isOpen} setIsOpen={setIsOpen} />

      {/* {isOpen && <CreateReminderModal setIsOpen={setIsOpen} />} */}
    </div>
  );
};
