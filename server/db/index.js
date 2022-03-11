//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Mbti = require("./models/Mbti");

//associations
Mbti.hasMany(User);
User.belongsTo(Mbti);

Mbti.hasOne(Mbti, { foreignKey: "fk_bestMatch" });
// Mbti.belongsTo(Mbti, { foreignKey: "fk_bestMatch" });

module.exports = {
  db,
  models: {
    User,
    Mbti,
  },
};
