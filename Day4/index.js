import { Console, error } from "console";
import express from "express";

const app = express();//app varible contains all the power of express
app.use(function (req, res, next) {

  console.log("middle ware chala")
  next();
  
})
app.get("/", function (req, res) {
  console.log("ek aur middle ware chala")
    res.send("this is a / route")
    
})
app.get("/profile", function (req, res) {
  console.log("ek aur middle ware chala profile ke liye")
  res.send("this is a /profile route");
});
app.get("/about", function (req, res) {
  console.log("ek aur middle ware chala about ke liye");
  res.send("this is a /about route");
});
app.get("/photos", function (req, res, next) {
  return next(new Error("Something is broke"))
  console.log("ek aur middle ware chala about ke liye");
  res.send("this is a /about route");
});
app.use( function (err,req, res, next) {
  console.error(err.stack);
  res.status(500).send("something went wrong")
 
});
app.listen(3000);
