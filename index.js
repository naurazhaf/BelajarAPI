const express = require("express");
const app = express();
const port = 3000;
const userRouter = require('./router/user')

//MIDDLEWARE
app.use(express.json());

app.use('/user', userRouter)
app.listen(port, () => console.log("start cooking"));

//   //VALIDASI NAMA

//   if (nama == "" || nama == undefined) {
//     res.status(400).send("INVALID NAMA").end();
//     return;
//   }
//   if (nama.length < 3) {
//     res.status(400).send("NAMA KURANG").end();
//     return;
//   }
//   //VALIDASI NOREK

//   if (noRek == "" || noRek == undefined) {
//     res.status(400).send("INVALID norek").end();
//     return;
//   }
// const noRekString = noRek.toString();

//   if (noRekString.length < 3) {
//     res.status(400).send("norek KURANG").end();
//     return;
//   }

//   //VALIDASI NOHP

//   if (noHp == "" || noHp == undefined) {
//     res.status(400).send("INVALID nohp").end();
//     return;
//   }

// const noHpString = noHp.toString();
//   if (noHpString.length < 3) {
//     res.status(400).send("nohp KURANG").end();
//     return;
//   }
