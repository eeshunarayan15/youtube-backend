const express=require('express');
const app=express();
const usrModel=require('./model/user')

const cors = require('cors');
const {model} = require("mongoose");
app.use(cors());
app.use(express.json());

app.get('/',async (req,res)=>{
res.send("/hello i am here")

})
app.post('/register', async (req, res) => {
    try {
        const { name, email, imgurl } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required" });
        }

        const createdUser = await usrModel.create({ name, email, imgurl });

        return res.status(201).json({ success: true, user: createdUser });
    } catch (error) {
        console.error("Error in /register:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});
app.get('/read',async (req,res)=>{
     try {
         const AllUsers =await  usrModel.find();
         res.status(200).json({ success: true, data: AllUsers });
     }catch (e) {
         console.error("Error in /read:", e.message);

     }

})
app.delete('/delete/:id',async (req,res)=>{
 try {
     const deleted = await usrModel.findByIdAndDelete(req.params.id);
     if (!deleted) {
         return res.status(404).json({ success: false, message: "User not found" });
     }
     return res.status(200).json({ success: true, message: "User deleted", data: deleted });
 }catch (e) {
     console.error("Error in /delete:", e.message);
 }
})
app.put('/update/:id',async (req,res)=>{
    const result=await usrModel.updateOne({ _id: req.params.id },req.body);
    if(result){
      return res.status(200).json({ success: true, message: "Updated User" });
    }else{
        return res.status(404).json({ success: false, message: "User not found" });
    }
})

app.listen(3000);