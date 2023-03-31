const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { 
  getRandomUsername, 
  getRandomEmail,
  getRandomThoughts, 
  getRandomReactions,
  genRandomIndex
 } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  const thoughts = [...getRandomThoughts(3)];

  await Thought.collection.insertMany(thoughts);

  for (let i = 0; i < 3; i++) {
    const email = getRandomEmail();
    const thought = thoughts[i];

    users.push({
      username: thought.username,
      email,
      thoughts: [thought._id]
    });
  }

  await User.collection.insertMany(users);

  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
