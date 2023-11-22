const express = require('express');
const TaskRepository = require('../repositories/TaskRepository');

const router = express.Router();
const taskRepository = new TaskRepository();

// Route to fetch all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await taskRepository.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new task
router.post('/tasks', async (req, res) => {
  const { name, isCompleted } = req.body;

  try {
    const taskId = await taskRepository.createTask(name, isCompleted);
    res.status(201).json({ id: taskId, message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a task
router.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { name, isCompleted } = req.body;

  try {
    await taskRepository.updateTask(taskId, name, isCompleted);
    res.json({ id: taskId, message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a task by ID
router.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    await taskRepository.deleteTask(taskId);
    res.json({ id: taskId, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
