const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

//trying to add gatekeeping middleware but req.headers/authorization comes back undefined
const { requireToken } = require("./gatekeepingMiddleware");

//get route for all user info (may not want/use this route)
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id/addWin", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    //using instance methods defined in User model
    await user.addWin();
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/addLoss", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    //using instance methods defined in User model
    await user.addLoss();
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/addDraw", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    //using instance methods defined in User model
    await user.addDraw();
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/updateMoney", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    //using instance methods defined in User model
    const { payout } = req.body;
    console.log("payout datatype: ", typeof payout);
    await user.updateMoney(payout);
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/resetStats", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    //using instance methods defined in User model
    await user.update({
      wins: 0,
      losses: 0,
      draws: 0,
      totalMoney: 2500,
    });
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});
