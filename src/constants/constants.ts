import dayjs from 'dayjs';
import { TodoItem } from '../TodoItem.interface';

export const Labels = [
  { id: 1, name: 'Bills' },
  { id: 2, name: 'Home' },
  { id: 3, name: 'Personal' },
];

export const TodoItemDefault: TodoItem = {
  name: '',
  date: null,
  category: Labels.map((label) => label.name),
  complete: false,
};
