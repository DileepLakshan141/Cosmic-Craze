const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

//student registration method
const createNewUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({
      message:
        "please provide the necessary details (email, password, username)",
    });
  }

  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //check provided email is already registered as any role
  let duplicate = await userModel.findOne({ email }).exec();

  if (duplicate) {
    return res
      .status(400)
      .json({ message: "This email is already registered to the system!" });
  }

  try {
    const result = await userModel.create({
      email,
      username,
      password: hashedPassword,
    });

    if (result) {
      return res.status(201).json({
        email: result.email,
        username: result.username,
      });
    } else {
      return res
        .status(400)
        .json({ message: "user account could not be created!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createNewUser,
};
