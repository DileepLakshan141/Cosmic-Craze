const userModel = require("../models/user.model");

const logoutUser = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.status(401).json({ error: "no cookie found!" });
  const refresh_token = cookie.jwt;

  //check refresh token exist on the student collection
  let foundUser = await userModel.findOne({ refresh_token }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(204);
  }

  foundUser.refresh_token = "";
  await foundUser.save();
  res.clearCookie("jwt", {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = { logoutUser };
