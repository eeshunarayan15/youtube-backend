const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/authtestapp`);
const userSchmea =mongoose.Schema({
username:String,
    email:String,
    password:String,
    age:Number,

})

module.exports=mongoose.model('user',userSchmea);
