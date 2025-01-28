import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

function createHash(callback) {
  client.del('ALX', (err, reply) => {
    if (err) {
      console.error(err);
    } else {
      client.hset('ALX', 'Portland', 50, redis.print);
      client.hset('ALX', 'Seattle', 80, redis.print);
      client.hset('ALX', 'New York', 20, redis.print);
      client.hset('ALX', 'Bogota', 20, redis.print);
      client.hset('ALX', 'Cali', 40, redis.print);
      client.hset('ALX', 'Paris', 2, redis.print);
      if (callback) callback();
    }
  });
}

function displayHash() {
  client.hgetall('ALX', (err, reply) => {
    if (err) {
      console.error(err);
    } else {
      console.log(reply);
    }
  });
}

createHash(displayHash);