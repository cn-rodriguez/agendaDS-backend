const jwt = require("jsonwebtoken");

function generateJWT(uid = "") {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Token cant not be generated");
        } else {
          resolve(token);
        }
      }
    );
  });
}

module.exports = generateJWT;
