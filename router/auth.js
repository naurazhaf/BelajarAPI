const express = require("express");
const router = express.Router();
const pool = require("../db/db.js");
const validator = require("../validators");
const { message } = require("../validators/createUser.validator.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

// router.post("/login", async (req, res) => {
//   const { body } = req;

//   const result = validator.login.validate(body);
//   const { error } = result;

//   if (error) {
//     res.status(400).json({
//       message: "Invalid Request",
//       data: error,
//     });
//     return;
//   }

//   try {
//     const result = await pool.query(
//       "SELECT * FROM users WHERE email = $1 AND password = $2",
//       [body.email, body.password]
//     );
//     if (result.rowCount === 0) {
//       return res.status(400).json({
//         message: "password salah",
//       });
//     }
//     return res.status(200).json({
//       message: "berhasil masuk",
//       data: result.rows[0],
//     });
//   } catch (error) {
//     console.error("Error creating user:", error.message);
//   }
// });

router.post("/login", async (req, res) => {
  const { body } = req;
  const result = validator.login.validate(body);
  const { error } = result;

  if (error) {
    res.status(400).json({
      message: "Invalid Request",
      data: error,
    });
    return;
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      body.email
    ]);
    if (result.rowCount === 0) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }
    const match = await bcrypt.compare(body.password, result.rows[0].password);
    if (!match) {
      return res.status(400).json({
        message: "invalid email or password",
      });
    }

    const user = result.rows[0]
    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, "strongsecret", {
        expiresIn: '1h'
    })


    return res.status(200).json({
      message: "berhasil masuk",
      access_token: token,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
});

module.exports = router;
