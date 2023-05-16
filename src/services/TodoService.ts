import axios, { AxiosResponse } from 'axios';
import { TodoItem } from '../TodoItem.interface';

export const getTodoItem = async () => {
  return axios
    .get('/todo', {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(({ data }) => data);
};

export const createTodoItem = async (todoItemPayload): Promise<TodoItem> => {
  return axios
    .post('/todo', todoItemPayload, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(({ data }) => data);
};

export const updateTodoItem = async (
  todoItemPayload,
  todoItemId
): Promise<TodoItem> => {
  return axios
    .put(`/todo/${todoItemId}`, todoItemPayload, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(({ data }) => data);
};

export const deleteTodoItem = async (todoItemId): Promise<AxiosResponse> => {
  return axios
    .delete(`/todo/${todoItemId}`, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(({ data }) => data);
};
