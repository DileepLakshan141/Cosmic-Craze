const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("./tokenGenerator");

//user login method
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password required!" });
  }

  try {
    const foundUser = await userModel.findOne({ email }).exec();

    //check if there is a matching user
    if (!foundUser) {
      return res.status(401).json({ error: "user does not exist!" });
    }

    const validUser = await bcrypt.compare(password, foundUser.password);

    if (validUser) {
      const { username, _id } = foundUser;
      const access_token = generateAccessToken({ username, _id });
      const refresh_token = generateRefreshToken(foundUser);

      foundUser.refresh_token = refresh_token;
      const result = await foundUser.save();

      res.cookie("jwt", refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(202).json({ access_token, username });
    } else {
      return res.status(400).json({ error: "invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { loginUser };
