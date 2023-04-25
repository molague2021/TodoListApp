import { useQuery } from '@tanstack/react-query';
import { getTodoItem } from '../services/TodoService';

export const useGetTodoItem = () => {
  return useQuery(['todoItems'], () => getTodoItem());
};
