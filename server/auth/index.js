const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    //deconstruct req.body to avoid injection
    const { username, email, password, wins, losses, draws, money } = req.body;
    const user = await User.create({
      username,
      email,
      password,
      wins,
      losses,
      draws,
      money,
    });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

//route for user to check their own info
router.get("/me", async (req, res, next) => {
  try {
    res.send(
      await User.findByToken(req.headers.authorization, {
        //avoid showing password
        attributes: { exclude: ["password"] },
      })
    );
  } catch (ex) {
    next(ex);
  }
});
