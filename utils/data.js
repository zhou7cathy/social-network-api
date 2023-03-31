const usernames = [
  'Brigandine',
  'Wardmote',
  'Lampadomancy',
  'Manducate',
  'Mizzenmast',
  'Loblolly',
  'Mongery',
  'Luke0Pintle',
  'Yatobyo',
  'Apoapsis',
  'Libellant',
  'Keister',
  'Eleventeen',
  'Placentiform',
  'Jamboree',
  'Hysteroid',
  'Scleroid',
  'Cleaveritzh2000',
  'Aboideau',
  'Acclivity',
  'Doodle',
  'Hooey',
  'Cabotage'
];

const emails = [
  'weazelman@msn.com',
  'pmint@yahoo.com',
  'thassine@yahoo.com',
  'drewf@msn.com',
  'johnh@gmail.com',
  'kewley@aol.com',
  'jimxugle@hotmail.com',
  'haskell_murazik@yahoo.com',
  'justice14@gmail.com',
  'lenna.franecki@gmail.com',
  'candelario_cremin@gmail.com',
  'toy_jakubowski@yahoo.com',
  'danial.kozey@hotmail.com',
  'sid_oconnell@hotmail.com',
  'gerda_kulas34@gmail.com',
  'joesph.yundt@yahoo.com',
  'pierre97@yahoo.com',
  'cassandre50@hotmail.com',
  'ilene_lindgren@yahoo.com',
  'electa.steuber@gmail.com',
  'brandon_brown@hotmail.com',
  'korbin41@gmail.com',
  'verdie.beahan@hotmail.com'
];
  
const thoughts = [
  'How to disagree with someone',
  'iPhone review',
  'how-to video',
  'video essay on the history of video games',
  'How to make money on the App Store',
  'Learn NextJS in five minutes (Not clickbate)',
  'Movie trailer',
  'Hello world',
  'Another possible solution to the algorithm',
  'Apology video',
  'Submission for startup pitch',
];
  
const Reactions = [
  'I disagree!',
  'I tried your algorithm, here were the results',
  'This was awesome',
  'Thank you for the great content',
  'Please check out my video response',
  'Like and subscribe to my channel please',
  'Reply: The side effects of in app purchases on digital marketplaces',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUsername = () => `${getRandomArrItem(usernames)}`;

// Gets a random email
const getRandomEmail = () => `${getRandomArrItem(emails)}`;

// Function to generate random thought that we can add to the database. Includes thought reactions.
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughts),
      username: getRandomUsername().split(' ')[0],
      reactions: [...getRandomReactions(1)],
    });
  }
  return results;
};

// Function to generate random reaction given a number
const getRandomReactions = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      responseBody: getRandomArrItem(Reactions),
      username: getRandomUsername(),
    });
  }
  return results;
};

const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

//Todo: get getRandomFriends
// const getRandomFriends = (int) => {

// }

// Export the functions for use in seed.js
module.exports = { 
  getRandomUsername, 
  getRandomEmail,
  getRandomThoughts, 
  getRandomReactions,
  genRandomIndex 
};
  