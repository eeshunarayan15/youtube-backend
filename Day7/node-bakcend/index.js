const express = require('express')
const app = express()
// app.use()
const userModel=require('./usermodel')
app.get("/", (req, res) => {
    res.send("hello")
})
app.get('/register',async (req, res) => {
   const createdUser= await userModel.create({
        name: "Anuraj Kumar Chaurasiya",
        username: "anurajkumarchaurasiya34",
        email: "anurajkumarchaurasiya34@gmail.com",
    });
   res.send(createdUser);
    console.log("hello");
})
app.get('/update',async (req, res) => {
    const updatedUser= await userModel.findOneAndUpdate({username:"eeshunarayan15"},{name:"Rishu Narayan"} ,{new: true})
    res.send(updatedUser);
})
app.get('/read',async (req, res) => {
    console.log("reading")
    const allUsers= await userModel.find();
    res.send(allUsers);
})
app.get('/api/v1/read',async (req, res) => {
    const user= await userModel.findOne();
    res.send(user);
})
app.get('/api/v1/delete', async (req, res) => {
    try {
        const deletedUser = await userModel.findOneAndDelete({
            username: "eeshunarayan15",
        });
        res.send(deletedUser);
    } catch (err) {
        res.status(500).send({ error: "Something went wrong", details: err });
    }
});


app.listen(3000)
