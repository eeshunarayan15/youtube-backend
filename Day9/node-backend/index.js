const express=require('express');
const app = express();
const jwt=require('jsonwebtoken')

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const bcrypt=require('bcrypt')
// const cokkieParser=require('cookie-parser');
// app.use(cokkieParser());
// app.get('/', async function (req, res) {
// res.cookie("eeshu","harsh");
// res.send("Hello World");
// })
app.get('/read',async function (req, res) {
    res.send("Hello World");
})
// app.get('/race',async function (req, res) {
//    console.log( req.cookies);
// })
app.get('/register', async function (req, res) {
    const plainPassword = "myplainPassword";

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        console.log("salt:", salt);
        console.log("hashed password:", hashedPassword);

        res.send(hashedPassword);
    } catch (err) {
        console.error("Error hashing password:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/verify',async function (req, res) {
    const plainPassword = "myplainPassword";
   bcrypt.compare("myplainPassword", "$2b$10$Mbrsjmdk7Ze6madoDic5a.YuP62tPMMBp3D1IUlYU2d.S7r4VBfWu",(err,res)=>{
        console.log(res);
        res.send(res)

    })
})

app.get('/signin',async (req, res) => {
   try{
       const plainPassword = "myplainPassword";
       const token= await  jwt.sign({plainPassword},"secret",);
       console.log(token);
       res.cookie('jwt',token);
       res.send(token);
   }catch(e){
       console.error(e.message);
   }
})
app.get('/api/v1/tokenverification',async (req, res) => {
  const data=  jwt.verify(req.cookies.jwt,"secret",(err,decoded)=>{
        if (err) {
            console.log(err);
        }else{
            console.log("Token has been verified", decoded);
        }
    })
})
app.listen(3000);