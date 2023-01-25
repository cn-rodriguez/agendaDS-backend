const { json, response } = require("express");
const { googleVerify } = require("../helpers/google-verify");

const User = require("../models/user");
const generateJWT = require("../helpers/generate-jwt");

const googleSignIn = async (req, res) => {
  const { id_token } = req.body;

  try {
    console.log(req.body);

    const { email, name, picture } = await googleVerify(id_token);
    // email exist
    let user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      const data = {
        name,
        email,
        picture,
        role: "STUDENT_ROLE",
        status: true,
      };

      user = new User(data);
      await user.save();
    }

    // Generar JWT
    const token = await generateJWT({
      id: user.id,
      role: user.role,
      login: true,
    });
    console.log(token);
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Problem authenticating user",
    });
  }
};

module.exports = { googleSignIn };
