const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;
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

//this route is essentially the same as the /auth/me route
router.get("/:id", requireToken, async (req, res, next) => {
  try {
    const user = await User.findbyPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put("/:id/addWins", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    //using instance methods defined in User model
    await user.addWin();
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/addLosses", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    //using instance methods defined in User model
    await user.addLoss();
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/addDraws", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    //using instance methods defined in User model
    await user.addDraw();
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/updateMoney", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    //using instance methods defined in User model
    const { payout } = req.body;
    await user.updateMoney(payout);
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});
