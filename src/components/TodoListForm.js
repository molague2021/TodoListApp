function TodoListForm() {
  return (
    <div className="title">
      <form>
        <div className="card-container">
          <h2>Todo</h2>
          {/*@todo - rating select component */}
          <div className="btn-container">
            <button className="btn btn-primary" type="submit">
              Create Reminder
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoListForm;
