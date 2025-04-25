export const taskService = {
  createTask: async (taskData) => {
    const response = await fetch('https://webappbackend.netlify.app/.netlify/functions/tasks', { // Correct URL here
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
