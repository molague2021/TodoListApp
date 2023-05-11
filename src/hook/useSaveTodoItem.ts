import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { TodoItem } from '../TodoItem.interface';
import { createTodoItem, updateTodoItem } from '../services/TodoService';

interface CreateScheduleProp {
  todoItemPayload: TodoItem;
  todoItemId?: string;
}

export const useSaveTodoItem = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ todoItemPayload, todoItemId }: CreateScheduleProp) => {
      if (todoItemId) {
        return updateTodoItem(todoItemPayload, todoItemId);
      } else {
        return createTodoItem(todoItemPayload);
      }
    },
    {
      onSuccess: (response) => {
        queryClient.setQueryData(['todoItems'], (item: TodoItem[]) => {
          console.log('item', item);
          return [...item, response];
        });
      },
    }
  );
};
