export interface TodoItem {
  name: string;
  date: string;
  category: string[];
  complete: boolean;
  id?: number;
}
