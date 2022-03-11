const router = require("express").Router();
const {
  models: { User, Mbti },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "level"],
      include: Mbti,
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const loggedInUser = await User.findByPk(req.params.userId);
    res.send(loggedInUser);
  } catch (err) {
    next(err);
  }
});
