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

const todoItemExists = (todoItems, response) => {
  return todoItems.some((item) => item.id === response.id);
};

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
        queryClient.setQueryData(['todoItems'], (items: TodoItem[]) => {
          console.log('item', items, response);
          if (todoItemExists(items, response)) {
            return items.map((item) => {
              if (item.id === response.id) {
                item = response;
              }

              return item;
            });
          } else {
            return [...items, response];
          }
        });
      },
    }
  );
};
