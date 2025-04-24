// src/components/TaskList.js
import React from 'react';
import { taskService } from '../services/api';

const TaskList = ({ tasks, onTaskDelete, onTaskComplete }) => {
  const handleComplete = async (taskId) => {
    try {
      await taskService.completeTask(taskId);
      onTaskComplete(taskId);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      onTaskDelete(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list">
        <h2>My Tasks</h2>
        <div className="empty-tasks">
          No tasks yet
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.7 : 1 }}>
              {task.title}
            </span>
            <div className="task-actions">
              <button className="complete-button" onClick={() => handleComplete(task.id)} disabled={task.completed}>
                ✓
              </button>
              <button className="delete-button" onClick={() => handleDelete(task.id)}>
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
