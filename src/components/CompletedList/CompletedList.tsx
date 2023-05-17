import React from 'react';
import { ListContainer } from '../../shared/ListContainer';
import TodoListItems from '../TodoList/TodoListItems';

export const CompletedList = () => {
  return (
    <ListContainer name="Completed Items" displayButton={false}>
      <TodoListItems />
    </ListContainer>
  );
};
