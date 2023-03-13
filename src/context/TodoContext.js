import { useReducer, createContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);

  const initialState = {
    todo: [],
    loading: false,
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = async () => {
    const response = await fetch('/todo?_sort=id&_order=desc');
    const data = await response.json();
    setTodoList(data);
    setLoading(false);
  };

  const [state, dispatch] = useReducer(initialState);

  return (
    <TodoContext.Provider value={{ todoList, isLoading }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
