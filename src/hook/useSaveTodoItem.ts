import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { TodoItem } from '../components/CreateReminderModal/CreateReminderModal';
import { createTodoItem } from '../services/TodoService';

interface CreateScheduleProp {
	todoItem: TodoItem;
}

export const useSaveTodoItem = () => {
	const queryClient = useQueryClient();

	return useMutation(
		({ todoItem }: CreateScheduleProp) => {
			return createTodoItem(todoItem);
		},
		{
			onSuccess: (response) => {
				console.log('response: ', response);
				queryClient.setQueryData(['todoItems'], (item: TodoItem[]) => {
					console.log('item', item);
					return [...item, response];
				});
			},
		}
	);
};
