import React, { useState } from 'react';
import'./style.module.scss'


function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;

    setTodos([...todos, { text: newTodo, id: Date.now() }]);
    setNewTodo('');
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
    setNewTodo(todo.text);
  };

  const handleUpdateTodo = () => {
    setTodos(todos.map(todo => 
      todo.id === currentTodo.id ? { ...todo, text: newTodo } : todo
    ));
    setIsEditing(false);
    setCurrentTodo(null);
    setNewTodo('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      isEditing ? handleUpdateTodo() : handleAddTodo();
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        onKeyDown={handleKeyDown}
        placeholder="Enter a new todo" 
      />
      <button onClick={isEditing ? handleUpdateTodo : handleAddTodo}>
        {isEditing ? 'Update Todo' : 'Add Todo'}
      </button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleEditTodo(todo)}>Edit</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
