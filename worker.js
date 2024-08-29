// worker.js
const amqp = require('amqplib');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const processRequest = async (request) => {
  // Implement your request processing logic here
  console.log('Processing request:', request);
};

const startWorker = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue('queue_example', { durable: true });

  channel.consume('queue_example', async (msg) => {
    if (msg !== null) {
      const request = JSON.parse(msg.content.toString());
      await processRequest(request);
      channel.ack(msg);
    }
  });
};

startWorker();
