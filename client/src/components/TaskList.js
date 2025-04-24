// src/components/TaskList.js
import React from 'react';

const TaskList = ({ tasks, onTaskDelete, onTaskComplete }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list">
        <h2>Mes tâches</h2>
        <div className="empty-tasks">
          Aucune tâche pour le moment
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Mes tâches</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span style={{ 
              textDecoration: task.completed ? 'line-through' : 'none',
              opacity: task.completed ? 0.7 : 1
            }}>
              {task.title}
            </span>
            <div className="task-actions">
              <button 
                className="complete-button"
                onClick={() => onTaskComplete(task.id)}
              >
                ✓
              </button>
              <button 
                className="delete-button"
                onClick={() => onTaskDelete(task.id)}
              >
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