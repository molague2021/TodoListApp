import dayjs, { Dayjs } from 'dayjs';

interface TodoItemDateProps {
  name: string;
  date: Dayjs;
}

export const TodoItemDate = ({ name, date }: TodoItemDateProps) => {
  return (
    <div>
      <div className="text-display">{name}</div>
      <div className="date">{dayjs(date).format('MM/DD/YYYY')}</div>
    </div>
  );
};
