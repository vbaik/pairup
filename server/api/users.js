const router = require("express").Router();
const {
  models: { User, Mbti },
} = require("../db");
const { requireToken } = require("./gateKeepingMiddleware");

module.exports = router;

router.get("/", requireToken, async (req, res, next) => {
  try {
    console.log((token = req.headers.authorization));
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

// find partners
router.get("/partners", requireToken, async (req, res, next) => {
  try {
    // console.log("req.user >>>>>>>> ", req.user.toJSON());

    const matchedMbti = await Mbti.findByPk(req.user.mbtiId);

    const partners = await User.findAll({
      // attributes: ["id", "username", "level"],
      where: {
        mbtiId: matchedMbti.fk_bestMatch,
      },
    });
    console.log("matched partners >>>>>>", partners);

    res.send(partners);
  } catch (err) {
    next(err);
  }
});


//update User profile info
