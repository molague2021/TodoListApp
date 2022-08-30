import { useEffect, useState } from 'react';
import { FaTimes, FaEdit, FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';
import Card from '../shared/Card';
import './TodoListItems.css';

function TodoListItems() {
  const [todoItem, setTodoItem] = useState([
    {
      id: 1,
      text: 'Wash dishes',
      category: ['Bills', 'Home'],
      date: new Date(2022, 11, 23),
      complete: true,
    },
    {
      id: 2,
      text: 'Wash dishes',
      category: ['Bills', 'Home'],
      date: new Date(2022, 11, 23),
      complete: false,
    },
    {
      id: 3,
      text: 'Wash dishes',
      category: ['Bills', 'Home'],
      date: new Date(2022, 11, 23),
      complete: false,
    },
  ]);

  const [editTodo, setEditTodo] = useState({
    data: {},
    edit: false,
  });

  // Checkmark the completed items in the List
  const handleCheck = (id) => {
    setTodoItem((todoItem) =>
      todoItem.map((selectedItem) => {
        if (selectedItem.id === id) {
          return {
            ...selectedItem,
            complete: !selectedItem.complete,
          };
        }

        return selectedItem;
      })
    );
  };

  const handleEdit = (id) => {
    console.log('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setTodoItem(todoItem.filter((item) => item.id !== id));
    }
  };

  useEffect(() => {
    console.log('Calling use effect');
  }, [todoItem]);

  return (
    <>
      {todoItem.map((item) => (
        <Card>
          <div key={item.id}>
            <button className="close" onClick={() => handleDelete(item.id)}>
              <FaTimes />
            </button>
            <button className="edit" onClick={() => handleEdit(item.id)}>
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
                <div className="text-display">{item.text}</div>
                <div className="date">{item.date.toDateString()}</div>
              </div>
              <div className="category-text">
                {item.category.map((category) => (
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
