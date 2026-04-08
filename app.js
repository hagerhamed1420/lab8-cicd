const express = require('express');
const os = require('os');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';

let db;

async function connectDB() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  db = client.db('lab6db');
  console.log('Connected to MongoDB:', MONGO_URL);
}

app.get('/', (req, res) => {
  res.json({
    app:  'CISC 886 Lab 8',
    mode: process.env.MODE || 'local',
    node: process.version,
    host: os.hostname(),
  });
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await db.collection('tasks')
      .find({}, { projection: { _id: 0 } })
      .toArray();
    const grouped = tasks.reduce((acc, task) => {
      acc[task.status] = acc[task.status] || [];
      acc[task.status].push(task);
      return acc;
    }, {});
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('--------------------------------------------------');
    console.log(`  CISC 886 Lab 8 — App started`);
    console.log(`  Port : ${PORT}`);
    console.log(`  Mode : ${process.env.MODE || 'local'}`);
    console.log(`  Node : ${process.version}`);
    console.log(`  Host : ${os.hostname()}`);
    console.log('--------------------------------------------------');
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});