import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
//import CreateReminderModal from './shared/CreateReminderModal';

import { TodoProvider } from './context/TodoContext';
import { TodoList } from './components/TodoList';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </QueryClientProvider>
  );
}

export default App;
