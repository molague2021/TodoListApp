import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { createTodoItem } from '../services/TodoService';

export const useSaveTodoItem = () => {
  //const queryClient = useQueryClient();

  return useMutation(
    (todoItem) => {
      return createTodoItem(todoItem);
    },
    {
      onSuccess: (response) => {
        console.log(response);
      },
    }
  );
};
