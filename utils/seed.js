const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { 
  getRandomUsername, 
  getRandomEmail,
  getRandomThoughts, 
  getRandomReactions 
 } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  const thoughts = getRandomThoughts(5);

  for (let i = 0; i < 5; i++) {
    const username  = getRandomUsername();
    const email  = getRandomEmail();

    users.push({
      username,
      email,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
