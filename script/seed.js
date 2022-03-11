"use strict";

const {
  db,
  models: { User, Mbti },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

//mbti data
const mbtiArr = [
  "ISFJ",
  "ESFJ",
  "ISTJ",
  "ISFP",
  "ESTJ",
  "ESFP",
  "ENFP",
  "ISTP",
  "INFP",
  "ESTP",
  "INTP",
  "ENTP",
  "ENFJ",
  "INTJ",
  "ENTJ",
  "INFJ",
];
const mbtiData = mbtiArr.map((mbtiType, idx) => ({
  id: idx + 1,
  type: mbtiType,
}));

const userNames = [
  "Lyle",
  "Francis",
  "Leslie",
  "Roberta",
  "Ronald",
  "Anne",
  "Eddy",
  "Debbie",
  "Shari",
  "Dennis",
  "Kirsten",
  "Evelyn",
  "Devon",
  "Carman",
  "Nora",
  "Nick",
  "Margo",
  "Fatima",
  "Alyssa",
  "Victor",
  "Lana",
  "Jonathan",
  "Lance",
  "Alvin",
  "Courtney",
  "Dana",
  "Johanne",
  "Lyne",
  "Dominic",
  "Cheryl",
  "Rachelle",
  "Arthur",
  "Amber",
  "Kayla",
  "Norm",
  "Tommy",
  "Joseph",
  "Lin",
  "Claudine",
  "Nadia",
  "Melody",
  "Holly",
  "Vicki",
  "Tom",
  "Renald",
  "Trent",
  "Karin",
  "Yan",
  "Jon",
  "Claudia",
  "Vivian",
  "Leo",
  "William",
];
const codeLevel = ["Beginner", "Experienced", "Intermediate"];

const usersData = userNames.map((username) => ({
  username: username,
  password: "123",
  level: codeLevel[Math.floor(Math.random() * 3)],
}));

//seed function
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all(
    usersData.map((user) => {
      return User.create(user);
    })
  );

  // Creating Mbti
  const mbtis = await Promise.all(
    mbtiData.map((mbti) => {
      return Mbti.create(mbti);
    })
  );

  //set relationships:
  //to check list of magic methods:
  console.log(Object.keys(User.prototype));

  // 1 : 1 = mbti : mbti
  const setMbtiData = (id1, id2) => {
    return mbtis[id2].setMbti(mbtis[id1]);
  };

  await setMbtiData(0, 8);
  await setMbtiData(8, 0);
  await setMbtiData(1, 4);
  await setMbtiData(4, 1);
  await setMbtiData(2, 9);
  await setMbtiData(9, 2);
  await setMbtiData(3, 5);
  await setMbtiData(5, 3);
  await setMbtiData(6, 15);
  await setMbtiData(15, 6);
  await setMbtiData(7, 14);
  await setMbtiData(14, 7);
  await setMbtiData(10, 13);
  await setMbtiData(13, 10);
  await setMbtiData(11, 12);
  await setMbtiData(12, 11);

  // 1 : m = mbti : users

  for (let i = 0; i < userNames.length; i++) {
    const randomMbtiId = Math.floor(Math.random() * 16);
    await users[i].setMbti(mbtis[randomMbtiId]);
  }

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //   },
  // };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
