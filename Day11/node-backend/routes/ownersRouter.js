const express = require("express");
const router = express.Router();
const mongoose=require("../config/mongooseConnection")
const ownerModel = require("../model/owners");
router.get("/", async (req, res) => {
  res.send("hello from the owner");
});
console.log(process.env.NODE_ENV,"CURRENT STATE OF ENV");
if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
      try {
          let owners= await ownerModel.find();
if (owners.length>0) return res.status(503).send("not authorized for owners");
const { fullname, email, password, product, picture, gstin } = req.body;

          const newOwner = await ownerModel.create({
              fullname,
              email,
              password,
          });

          res.status(201).json({ message: "Owner created", owner: newOwner });
      } catch (err) {
          console.error("Error creating owner:", err);
          res.status(500).json({ error: "Failed to create owner" });
      }
  });
}

module.exports = router;
