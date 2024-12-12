const express = require("express");
const router = express.Router();
const pool = require("../db/db.js");
const validator = require("../validators");
const { message } = require("../validators/createUser.validator.js");

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
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [body.email, body.password]
    );
    if (result.rowCount === 0) {
      return res.status(400).json({
        message: "password salah",
      });
    }
    return res.status(200).json({
      message: "berhasil masuk",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
});

// router.put("/new", async (req, res) => {
//   const { body } = req;

//   const result = validator.createUser.validate(body);
//   const { error } = result;

//   // if (error) {
//   //     res.status(400).json({
//   //         message: "Invalid Request",
//   //         data: error
//   // })

//   try {
//     const result = await pool.query(
//       "UPDATE users set name = $1, email = $2, password = $3 where id = $4 returning *",
//       [body.name, body.email, body.password, body.id]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({
//         message: "user not found",
//       });
//     }

//     res.status(201).json({
//       message: "success",
//       data: result.rows,
//     });
//   } catch (error) {
//     console.error("Error creating user:", error.message);

//     //Handle unique constraint errors for email
//     if (error.code === "23505") {
//       res.status(409).json({ message: "Email already exist." });
//     } else {
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
//   // }
// });

// router.get("/new", async (req, res) => {
//   try {
//     const { rows } = await pool.query(
//       "SELECT * FROM users WHERE  is_deleted == false"
//     );
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

module.exports = router;
