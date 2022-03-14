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
  "Joe",
  "Josephine",
  "Anna",
  "Brooke",
  "Carol",
  "Ying",
  "Diana",
  "EB",
  "Jessica",
  "Joanne",
  "Johanna",
  "Grace",
  "Kaia",
  "Katelyn",
  "Kelsey",
  "Kimberley",
  "Kristin",
  "L",
  "Lauren",
  "Leah",
  "Lei",
  "Linda",
  "Mai",
  "Maxiel",
  "Rusty",
  "May",
  "Melissa",
  "Merle",
  "Mica",
  "Olivia",
  "Pamela",
  "Qina",
  "Sara",
  "Sarina",
  "Serena",
  "Violet",
  "Woramon",
];
const codeLevel = ["Beginner", "Experienced", "Intermediate"];

const userImg = [
  "https://www.thesprucepets.com/thmb/wpN_ZunUaRQAc_WRdAQRxeTbyoc=/4231x2820/filters:fill(auto,1)/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg",
  "https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/8/2021/02/GettyImages-997141470-e1614176377827.jpg",
  "https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
  "http://images6.fanpop.com/image/photos/43100000/cute-dog-dogs-43117551-736-736.jpg",
  "https://i.pinimg.com/originals/be/82/15/be821544fc5f328567cb538f96edb49a.jpg",
  "https://preview.redd.it/8qyel6cy6qh31.jpg?auto=webp&s=aaae74229c2568be852042a5f945b5fb6b8e3a8d",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lifestyle-bestdogbreeds-1577128927.png?crop=0.502xw:1.00xh;0.263xw,0&resize=640:*",
  "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F09%2F22%2F50-cute-dog-names.jpg",
  "https://static.boredpanda.com/blog/wp-content/org_uploads/2014/06/cute-dog.jpg",
  "https://www.scotsman.com/webimg/b25lY21zOjViZjVjYjc0LTgwZDctNGE4Zi1iNWZiLTE1MDA3YzAyNzJjYTo4ZDMyZGI1Yy03NDcxLTRhMjEtODA4ZS0xNTM4MWYxOGQ2Y2M=.jpg?width=2048&enable=upscale",
  "https://www.pumpkin.care/blog/wp-content/uploads/2020/11/20-Cutest-Dog-Names.jpg",
  "https://www.thesprucepets.com/thmb/EpDM0nWiLTrA-cTT577VmD4b-80=/2448x2448/smart/filters:no_upscale()/FunnyDogSmiling-ef11b73fa1834734b8c47025039fcd43.jpg",
  "https://cdn1.tedsby.com/storage/5/0/1/501631/collectible-dog-belle-white-chihuahua-puppy-with-rose-in-its-mouth-felted-interior-toy-ooak.jpg",
  "https://hashtaglegend.com/wp-content/uploads/2020/08/international-dog-day-1024x1024.jpg",
  "https://d17fnq9dkz9hgj.cloudfront.net/uploads/2018/04/Frenchie_05.jpg",
  "https://i.pinimg.com/736x/f3/89/ef/f389efb2a57669d9b50b97659507a2fe.jpg",
  "https://i.pinimg.com/736x/dc/cb/4e/dccb4ed0fb9d7ee6e4478be4cd5d86f7.jpg",
];

const usersData = userNames.map((username) => ({
  username: username,
  password: "123",
  level: codeLevel[Math.floor(Math.random() * 3)],
  imageURL: userImg[Math.floor(Math.random() * userImg.length)],
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
