// src/components/TaskForm.js
import React, { useState } from 'react';
import { taskService } from '../services/api';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setSubmitting(true);
    setError(''); // Reset previous errors
    
    try {
      const newTask = await taskService.createTask({ title });
      setTitle('');
      if (onTaskAdded) onTaskAdded(newTask);
    } catch (error) {
      setError('Error creating task');
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="task-form">
      <h2>Add a Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="task-input"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
        />
        <button type="submit" className="task-button" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TaskForm;
