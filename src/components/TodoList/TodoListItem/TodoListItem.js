import PropTypes from 'prop-types';

import { useQueryClient } from '@tanstack/react-query';
import { CheckComplete } from './CheckComplete';
import { TodoItemDate } from './TodoItemDate';
import { TodoItemCategory } from './TodoItemCategory';
import { FaTimes, FaEdit } from 'react-icons/fa';
import Card from '../../../shared/Card/Card';
import { useDeleteTodoItem } from '../../../hook/useDeleteTodoItem';
import '../../../styled/TodoListItems.css';

function TodoListItems({
  todoList,
  isCompleteList,
  onEditTodoItem,
  onCheckChange,
}) {
  const queryClient = useQueryClient();
  const { mutate: mutateDeleteTodoItem } = useDeleteTodoItem();

  const handleEdit = (e, item) => {
    onEditTodoItem(e, item);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      mutateDeleteTodoItem(
        { todoItemId: id },
        {
          onSuccess: () => {
            queryClient.setQueryData(['todoItems'], (items) =>
              items.filter((item) => item.id !== id)
            );
          },
        }
      );
    }
  };

  return (
    <>
      {todoList?.map((item) => (
        <Card key={item.name}>
          <div key={item.id}>
            <button className="close" onClick={() => handleDelete(item.id)}>
              <FaTimes />
            </button>
            {!isCompleteList && (
              <button className="edit" onClick={(e) => handleEdit(e, item)}>
                <FaEdit />
              </button>
            )}
            <div style={{ display: 'flex' }}>
              <CheckComplete item={item} onChange={onCheckChange} />
              <TodoItemDate name={item.name} date={item.date} />
              <TodoItemCategory categories={item.category} />
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}

TodoListItems.propTypes = {
  isLoading: PropTypes.bool,
  todoList: PropTypes.array,
  isCompleteList: PropTypes.bool,
  onEditTodoItem: PropTypes.func,
  onCheckChange: PropTypes.func,
};

export default TodoListItems;
