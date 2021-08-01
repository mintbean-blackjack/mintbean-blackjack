const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

const TOKEN = "token";

router.post("/login", async (req, res, next) => {
  console.log("req.body at login>>>>>", req.body);
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    //deconstruct req.body to avoid injection
    const { username, password, wins, losses, draws, money } = req.body;
    const user = await User.create({
      username,
      password,
      wins,
      losses,
      draws,
      money,
    });
    res.send({ token: await user.generateToken() });
    console.log("token from signup>>>>", user.generateToken());
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
  console.log(
    "req.headers.authorization in /me>>>>",
    req.headers.authorization
  );
  try {
    const user = await User.findByToken(req.headers.authorization, {
      //avoid showing password
      attributes: { exclude: ["password"] },
    });
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
