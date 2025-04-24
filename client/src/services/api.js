// src/services/api.js
export const taskService = {
  getTasks: async () => {
    const response = await fetch('http://localhost:5000/api/tasks');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return await response.json();
  },

  createTask: async (task) => {
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    return await response.json();
  },

  completeTask: async (taskId) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/complete`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error('Failed to complete task');
    }

    return await response.json();
  },

  deleteTask: async (taskId) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    return await response.json();
  },
};
