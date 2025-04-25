// src/App.js
import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { taskService } from './services/api';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const allTasks = await taskService.getAllTasks();
        // Ensure tasks use `id` instead of `_id`
        const formatted = allTasks.map(task => ({
          ...task,
          id: task._id,
        }));
        setTasks(formatted);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    loadTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, { ...newTask, id: newTask.id || newTask._id }]);
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
