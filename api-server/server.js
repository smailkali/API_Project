// server.js - Configuration de l'API avec Express
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Importing DB connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all tasks
app.get('/api/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get task by ID
app.get('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  db.get('SELECT * FROM tasks WHERE id = ?', [taskId], (err, row) => {
    if (err || !row) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(row);
  });
});

// Add new task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  db.run('INSERT INTO tasks (title) VALUES (?)', [title], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, completed: 0 });
  });
});

// Complete a task
app.patch('/api/tasks/:id/complete', (req, res) => {
  const taskId = parseInt(req.params.id);
  db.run('UPDATE tasks SET completed = 1 WHERE id = ?', [taskId], function (err) {
    if (err || this.changes === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task marked as complete' });
  });
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  db.run('DELETE FROM tasks WHERE id = ?', [taskId], function (err) {
    if (err || this.changes === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
