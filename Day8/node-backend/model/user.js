const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/testapp");
const userSchema=mongoose.Schema({
    name: String,
    email: String,
    imgurl: String,
})
module.exports= mongoose.model('user',userSchema);
