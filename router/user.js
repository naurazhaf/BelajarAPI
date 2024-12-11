const express = require("express");
const router = express.Router();
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

router.get("/", (req, res) => res.send(users));

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

module.exports = router;
