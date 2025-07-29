const mongoose = require("mongoose");

const ownersSchema = new mongoose.Schema({
    fullname: { type: String, minLength: 3, trim: true },
    email: String,
    password: String,
    picture: String,
    gstin: Number,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
});

module.exports = mongoose.model("owners", ownersSchema);
