// src/components/TaskPage.js
import React, { useEffect, useState } from 'react';
import { taskService } from '../services/api';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await taskService.getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleTaskComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  return (
    <div>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList
        tasks={tasks}
        onTaskDelete={handleTaskDelete}
        onTaskComplete={handleTaskComplete}
      />
    </div>
  );
};

export default TaskPage;
