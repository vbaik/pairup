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
    const mbti = req.body.mbti;
    // const userMbti = await Mbti.findOne({
    //   logging: console.log,
    //   where: {
    //     type: mbti,
    //   },
    // });
    const userMbti = Mbti.findMbti();
    console.log("**********", userMbti);
    const user = await User.findByPk(req.use.id);
    const updatedUserInfo = {
      mbtiId: userMbti.id,
      ...req.body,
    };
    res.json(await user.update(updatedUserInfo));
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

//get user statistics
router.get("/stats", async (req, res, next) => {
  try {
    //calculate coder level ratio:
    const totalNumUsers = await User.count();
    const numBeginners = await User.count({
      where: { level: "Beginner" },
    });
    const numInterms = await User.count({
      where: { level: "Intermediate" },
    });
    const numExperts = await User.count({
      where: { level: "Experienced" },
    });
    const coderLevelRatio = {
      Beginner: numBeginners / totalNumUsers,
      Intermediate: numInterms / totalNumUsers,
      Experienced: numExperts / totalNumUsers,
    };

    //calculate mbti ratio
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
    const userMbtiRatio = [];
    for (let i = 0; i < mbtiArr.length; i++) {
      let numEachMbtiUsers = await User.count({
        where: { mbtiId: i + 1 },
      });
      let mbtiName = mbtiArr[i];
      userMbtiRatio.push({ [mbtiName]: numEachMbtiUsers / totalNumUsers });
    }
    // const userMbtiCountObj = mbtiArr.forEach((mbti)=> {

    // })

    //combine both numbers as an object

    const totalStats = {
      coderLevelStats: coderLevelRatio,
      userMbtiStats: userMbtiRatio,
    };

    res.send(totalStats);
  } catch (err) {
    next(err);
  }
});
