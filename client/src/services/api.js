// src/services/api.js
export const taskService = {
  createTask: async (taskData) => {
    const response = await fetch('https://webappbackend.netlify.app/.netlify/functions/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to create task');
    return data;
  },

  deleteTask: async (taskId) => {
    const response = await fetch(`https://webappbackend.netlify.app/.netlify/functions/tasks?id=${taskId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to delete task');
    return data;
  },

  getAllTasks: async () => {
    const response = await fetch('https://webappbackend.netlify.app/.netlify/functions/tasks');
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch tasks');
    return data;
  },

  completeTask: async (taskId) => {
    console.log("Complete task logic pending.");
  },
};
