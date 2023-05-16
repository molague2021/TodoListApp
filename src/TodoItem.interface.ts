import { Dayjs } from 'dayjs';

export interface TodoItem {
  name: string;
  date: Dayjs;
  category: string[];
  complete: boolean;
  id?: number;
}
