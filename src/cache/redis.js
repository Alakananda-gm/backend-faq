const { createClient } = require('redis');

// Create a Redis client
const client = createClient();

// Handle connection events
client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis
client.connect();

module.exports = client;