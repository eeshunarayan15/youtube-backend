const express=require('express')
const app = express();
const path = require("path");

app.use(express.json())
app.use(express.urlencoded({ encoded: true }))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function (req, res) {
  res.render("index.ejs");
})
app.use(function (req, res, next) {
    console.log("middle ware chala")
    next()
})

// app.get("/", function (req, res) {
//   console.log("ek aur middle ware chala")
//     res.send("this is a / route with frontend")
    
// })
app.get("/profile/:username", function (req, res) {
  console.log("ek aur middle ware chala profile ke liye")
  // res.send("this is a /profile route");
  res.send(`welcome,${req.params.username}`)
});
app.get("/author/:username/:age",function (req, res) {
 res.send(`welcome ${req.params.username} of age ${req.params.age}`) 
})
// app.get("/about", function (req, res) {
//   console.log("ek aur middle ware chala about ke liye");
//   res.send("this is a /about route");
// });
// app.get("/photos", function (req, res, next) {
//   return next(new Error("Something is broke"))
//   console.log("ek aur middle ware chala about ke liye");
//   res.send("this is a /about route");
// });
// app.use( function (err,req, res, next) {
//   console.error(err.stack);
//   res.status(500).send("something went wrong")
 
// });
app.listen(3000);
// const path=require('path')
// console.log(path.join(__dirname,'public'))