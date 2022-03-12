const router = require("express").Router();
const {
  models: { User, Mbti },
} = require("../db");
const { requireToken } = require("./gateKeepingMiddleware");

module.exports = router;

router.get("/", requireToken, async (req, res, next) => {
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

// //get single user:
// router.get("/:id", async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id, {
//       include: Mbti,
//     });
//     if (user === null) {
//       res.status(404);
//     }
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// });

// //update User profile info
// router.put("/:id", async (req, res, next) => {
//   try {
//     console.log("req.body >>>>>>", req.body);
//     const user = await User.findByPk(req.params.id);
//     res.json(await user.update(req.body));
//   } catch (err) {
//     next(err);
//   }
// });

//update User profile info
router.put("/", requireToken, async (req, res, next) => {
  try {
    console.log("req.body >>>>>>", req.body);
    const user = await User.findByPk(req.user.id);
    res.json(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});

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

    res.send(partners);
  } catch (err) {
    next(err);
  }
});
