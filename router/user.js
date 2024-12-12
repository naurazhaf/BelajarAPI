const express = require("express");
const router = express.Router();
const pool = require("../db/db.js");
const validator = require("../validators");

let users = [
  {
    id: 1,
    nama: "naura",
    no_rek: "123",
    no_hp: "813",
  },
  {
    id: 2,
    nama: "zhafira",
    no_rek: "123",
    no_hp: "813",
  },
];

// router.get("/", async(req, res) => (res.send(users)));

router.post("/", (req, res) => {
  const { body } = req; //--> dpt semua property body yg ada di dalam req
  const result = validator.createUser.validate(body);
  const { error } = result;
  if (error) {
    res.status(400).json({
      message: "Invalid Request",
      data: error,
    });
    return;
  }

  //GENERATE ID
  const lastEntry = users.at(users.length - 1);
  const LastID = lastEntry.id + 1;

  const nama = body.nama;
  const noRek = body.no_rek;
  const noHp = body.no_hp;

  const newUser = {
    id: LastID,
    nama: nama,
    no_rek: noRek,
    no_hp: noHp,
  };

  users.push(newUser);

  res.json({
    message: "Data Created",
  });
});


router.put('/new', async (req, res) => {
  const { body } = req;

  const result = validator.createUser.validate(body)
  const { error } = result;

  // if (error) {
  //     res.status(400).json({
  //         message: "Invalid Request",
  //         data: error
  // })

  try {
      const result = await pool.query(
          'UPDATE users set name = $1, email = $2, password = $3 where id = $4 returning *',
          [body.name, body.email, body.password, body.id]
      );

      if(result.rowCount === 0){
          return res.status(404).json({
              "message" : "user not found"

          })
      }

      res.status(201).json({
          "message" : "success",
          "data" : result.rows
      });
      } catch(error) {
          console.error('Error creating user:', error.message);

          //Handle unique constraint errors for email
          if (error.code === '23505') {
              res.status(409).json({message: 'Email already exist.'});
          } else {
              res.status(500).json({message: 'Internal Server Error'});
          }
      }
  // }
})

router.post("/new", async (req, res) => {
  const { body } = req;

  const result = validator.createUser.validate(body);
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
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [body.name, body.email, body.password]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating user:", error.message);

    //Handle unique constraint errors for email
    if (error.code === "23505") {
      res.status(409).json({ message: "Email already exist." });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  // }
});

router.get("/new", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE  is_deleted == false"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
