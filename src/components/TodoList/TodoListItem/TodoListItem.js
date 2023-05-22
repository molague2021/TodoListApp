import { useEffect, useState, useContext } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import { useQueryClient } from '@tanstack/react-query';
import TodoContext from '../../../context/TodoContext';
import { CheckComplete } from './CheckComplete';
import { FaTimes, FaEdit, FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';
import { Spinner } from '../../../shared/Spinner';
import Card from '../../../shared/Card';
import { useGetTodoItem } from '../../../hook/useGetTodoItem';
import { useDeleteTodoItem } from '../../../hook/useDeleteTodoItem';
import { motion, AnimatePresence } from 'framer-motion';
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
              <div>
                <div className="text-display">{item.name}</div>
                <div className="date">
                  {dayjs(item.date).format('MM/DD/YYYY')}
                </div>
              </div>
              <div className="category-text">
                {item.category?.map((category) => (
                  <div className="category">
                    <p style={{ marginBottom: '5px' }}>{category}</p>
                  </div>
                ))}
              </div>
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
