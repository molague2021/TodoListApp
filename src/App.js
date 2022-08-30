import logo from './logo.svg';
import './App.css';
import TodoListForm from './components/TodoListForm';
import TodoListItems from './components/TodoListItems';
import Header from './components/Header';
import { useState } from 'react';
import CreateReminderModal from './shared/CreateReminderModal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="App">
        <Header />
        <div className="container">
          <TodoListForm setIsOpen={setIsOpen} />
          <TodoListItems />
        </div>
        {isOpen && <CreateReminderModal setIsOpen={setIsOpen} />}
      </div>
    </>
  );
}

export default App;
