import { useRef } from 'react';
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';
import { TodoItem } from '../../../TodoItem.interface';

interface CheckCompleteProps {
  item: TodoItem;
  onChange: (_item: TodoItem) => void;
}

export const CheckComplete = ({ item, onChange }: CheckCompleteProps) => {
  const itemRef = useRef<TodoItem>();
  console.log(itemRef);
  const onCheckChange = (e) => {
    e.preventDefault();
    console.log({ item });
    itemRef.current = {
      ...item,
      complete: !item.complete,
    };
    onChange(itemRef.current);
  };
  return (
    <button className="circle" onClick={onCheckChange}>
      {!item.complete ? (
        <FaRegCircle />
      ) : (
        <FaRegCheckCircle style={{ color: 'green' }} />
      )}
    </button>
  );
};
