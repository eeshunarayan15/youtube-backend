const mongoose = require("mongoose");
const cartItemSchema = require("../model/cartItem"); // if externalized

const usersSchema = new mongoose.Schema({
    fullname: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    contact: Number,
    picture: String,
    cart: [cartItemSchema], // embedded array of cart items
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }]
}, { timestamps: true });

module.exports = mongoose.model("users", usersSchema);
