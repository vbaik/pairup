const Sequelize = require("sequelize");
const db = require("../db");

const Mbti = db.define("mbti", {
  type: {
    type: Sequelize.ENUM(
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
      "INFJ"
    ),
  },
});

Mbti.findMbti = async function () {
  const foundMbti = await Mbti.findOne({
    logging: console.log,
    where: {
      type: "ESTP",
    },
  });
  return foundMbti;
};

module.exports = Mbti;
