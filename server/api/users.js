const router = require("express").Router();
const {
  models: { User, Mbti },
} = require("../db");
const { requireToken } = require("./gateKeepingMiddleware");

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

// router.get("/:userId", requireToken, async (req, res, next) => {
//   try {
//     const loggedInUser = await User.findByPk(req.params.userId);
//     res.send(loggedInUser);
//   } catch (err) {
//     next(err);
//   }
// });

//find partenr
router.get("/partners", requireToken, async (req, res, next) => {
  try {
    console.log("req.user >>>>>>>> ", req.user);
    const userMbtiId = req.user.id;
  } catch (err) {
    next(err);
  }
});
