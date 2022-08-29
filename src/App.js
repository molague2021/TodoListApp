import logo from './logo.svg';
import './App.css';
import TodoListForm from './components/TodoListForm';
import TodoListItems from './components/TodoListItems';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <TodoListForm />
        <TodoListItems />
      </div>
    </div>
  );
}

export default App;
