const {
  models: { User },
} = require("../db");

//require token to only update db for user
const requireToken = async (req, res, next) => {
  try {
    console.log(">>>>>>>>>>req.headers in requireToken: ", req.headers);
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { requireToken };
