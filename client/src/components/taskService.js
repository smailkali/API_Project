// src/services/api.js

export const taskService = {
    // Récupérer toutes les tâches
    getAllTasks: async () => {
      const response = await fetch('http://localhost:5000/api/tasks');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des tâches');
      }
      return await response.json();
    },
  
    // Créer une nouvelle tâche
    createTask: async (taskData) => {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la création de la tâche');
      }
  
      return await response.json();
    },
  
    // Supprimer une tâche par ID
    deleteTask: async (taskId) => {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la tâche');
      }
      return await response.json();
    },
  };
  