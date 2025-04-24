// src/services/api.js
export const taskService = {
  createTask: async (taskData) => {
    const response = await fetch('https://smailbenfakirapitaskfile.netlify.app/.netlify/functions/server/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error('Error creating task');
    }

    return await response.json(); // Return the created task
  },
};
