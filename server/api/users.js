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
// router.get("/partners", async (req, res, next) => {
//   try {
//     // console.log("req.user >>>>>>>> ", req.user.toJSON());
//     // const userMbtiId = req.user.mbtiId;
//     const partners = await User.findAll({
//       // attributes: ["id", "username", "level"],
//       where: {
//         mbtiid: 1,
//       },
//     });
//     res.send(partners);
//   } catch (err) {
//     next(err);
//   }
// });
