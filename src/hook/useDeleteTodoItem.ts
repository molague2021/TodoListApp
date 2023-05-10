import { useMutation } from '@tanstack/react-query';
import { deleteTodoItem } from '../services/TodoService';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

interface DeleteSelectedTodoItem {
  todoItemId: string;
}

export const useDeleteTodoItem = () => {
  return useMutation(
    ({ todoItemId }: DeleteSelectedTodoItem) => {
      return deleteTodoItem(todoItemId);
    },
    {
      onError: (error: AxiosError | Error) => {
        let message = 'Unable to Delete todo item, please try again';

        if (axios.isAxiosError(error) && error.response.status === 404) {
          message = `Selected todo item could not be found.`;
        }

        if (axios.isAxiosError(error) && error.response.status === 400) {
          message =
            'The todo item cannot be deleted because it is being used by a service.';
        }

        toast.error(message);
      },
    }
  );
};
