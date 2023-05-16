import { useEffect, useState, useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import TodoContext from '../context/TodoContext';
import { FaTimes, FaEdit, FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';
import { Spinner } from '../shared/Spinner';
import Card from '../shared/Card';
import { useGetTodoItem } from '../hook/useGetTodoItem';
import { useDeleteTodoItem } from '../hook/useDeleteTodoItem';
import { motion, AnimatePresence } from 'framer-motion';
import '../styled/TodoListItems.css';

function TodoListItems({ onEditTodoItem }) {
  const queryClient = useQueryClient();
  const { mutate: mutateDeleteTodoItem } = useDeleteTodoItem();
  //const { todoList, isLoading } = useContext(TodoContext);
  const { data: todoList, isLoading } = useGetTodoItem();

  if (!isLoading && (!todoList || todoList.length === 0)) {
    return <p>No Items have been created.</p>;
  }

  //Checkmark the completed items in the List
  const handleCheck = (id) => {
    // setTodoItem((todoItem) =>
    //   todoItem.map((selectedItem) => {
    //     if (selectedItem.id === id) {
    //       return {
    //         ...selectedItem,
    //         complete: !selectedItem.complete,
    //       };
    //     }
    //     return selectedItem;
    //   })
    // );
  };

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

  // useEffect(() => {
  //   console.log('Calling use effect');
  // }, [todoItem]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {todoList?.map((item) => (
        <Card>
          <div key={item.id}>
            <button className="close" onClick={() => handleDelete(item.id)}>
              <FaTimes />
            </button>
            <button className="edit" onClick={(e) => handleEdit(e, item)}>
              <FaEdit />
            </button>
            <div style={{ display: 'flex' }}>
              <button
                className="circle"
                type="checked"
                onClick={() => handleCheck(item.id)}
              >
                {!item.complete ? (
                  <FaRegCircle />
                ) : (
                  <FaRegCheckCircle style={{ color: 'green' }} />
                )}
              </button>
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

export default TodoListItems;
