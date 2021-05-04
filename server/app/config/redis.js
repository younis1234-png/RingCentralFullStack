let redis = require("redis"),
  client = redis.createClient();

client.on("error", (error) => {
  console.log(error);
});

module.exports = client;

// Redis is a fast and efficient in-memory key-value store
