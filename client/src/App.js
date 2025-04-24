// src/App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  
  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="todo-container">
      <div className="todo-card">
        <header className="todo-header">
          <h1>Todo App</h1>
        </header>
        <div className="todo-content">
          <TaskForm onTaskAdded={handleTaskAdded} />
          <TaskList 
            tasks={tasks} 
            onTaskDelete={handleTaskDelete}
            onTaskComplete={handleTaskComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default App;