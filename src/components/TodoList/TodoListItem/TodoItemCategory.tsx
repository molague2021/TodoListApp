interface TodoItemCategoryProps {
  categories: string[];
}

export const TodoItemCategory = ({ categories }: TodoItemCategoryProps) => {
  return (
    <div className="category-text">
      {categories.map((category) => (
        <div key={category} className="category">
          <p style={{ marginBottom: '5px' }}>{category}</p>
        </div>
      ))}
    </div>
  );
};
