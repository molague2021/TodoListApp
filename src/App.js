import logo from './logo.svg';
import './App.css';
import TodoListForm from './components/TodoListForm';
import TodoListItems from './components/TodoListItems';
import Header from './components/Header';
import { useState } from 'react';
//import CreateReminderModal from './shared/CreateReminderModal';
import { CreateReminderModal } from './components/CreateReminderModal/CreateReminderModal';
import { TodoProvider } from './context/TodoContext';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TodoProvider>
        <div className="App">
          <Header />
          <div className="container">
            <TodoListForm setIsOpen={setIsOpen} />
            <TodoListItems />
          </div>
          {/* {isOpen && <CreateReminderModal setIsOpen={setIsOpen} />} */}
        </div>
        <CreateReminderModal open={isOpen} setIsOpen={setIsOpen} />
      </TodoProvider>
    </QueryClientProvider>
  );
}

export default App;
