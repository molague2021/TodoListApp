import axios, { AxiosResponse} from 'axios';

export const getTodoItem = async () => {
  return axios
    .get('/todo', {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(({ data }) => data);
};

export const createTodoItem = async (todoItem): Promise<AxiosResponse> => {
  return axios
    .post('/todo', todoItem, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(({data}) => data);
};
