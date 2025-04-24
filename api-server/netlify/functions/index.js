// netlify/functions/index.js

const mongoose = require('mongoose');
const { send } = require('@netlify/functions');
const cors = require('cors');
const bodyParser = require('body-parser');

// Replace <PASSWORD> with your real MongoDB password
const mongoURI = 'mongodb+srv://benfakirsmail:Benfakirsmail442002@cluster0.rp6an8b.mongodb.net/taskapp?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ Connected to MongoDB');
});

// Define Task model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);

// Express-like handler for Netlify functions
const app = (event, context) => {
  const corsHandler = cors();
  const bodyParserHandler = bodyParser.json();

  return new Promise((resolve) => {
    corsHandler(event, context, () => {
      bodyParserHandler(event, context, () => {
        switch (event.httpMethod) {
          case 'GET':
            if (event.path === '/api/tasks') {
              Task.find()
                .then((tasks) => resolve(send({ statusCode: 200, body: JSON.stringify(tasks) })))
                .catch((err) => resolve(send({ statusCode: 500, body: JSON.stringify({ error: err.message }) })));
            }
            break;

          case 'POST':
            if (event.path === '/api/tasks') {
              const { title } = JSON.parse(event.body);
              const task = new Task({ title });
              task
                .save()
                .then((newTask) => resolve(send({ statusCode: 201, body: JSON.stringify(newTask) })))
                .catch((err) => resolve(send({ statusCode: 500, body: JSON.stringify({ error: err.message }) })));
            }
            break;

          // Add PATCH, DELETE, and other routes as needed...

          default:
            resolve(send({ statusCode: 404, body: 'Not Found' }));
            break;
        }
      });
    });
  });
};

module.exports.handler = app;
