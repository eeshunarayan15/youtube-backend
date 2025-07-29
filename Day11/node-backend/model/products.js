const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  discount: Number,
  bgColor: String,
  panelColor: String,
  textColor: String,

  // Reference to category and subcategory
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  subcategory: { type: String, required: true }, // Subcategory name (embedded in Category.subcategories)
});

module.exports = mongoose.model("products", productsSchema);
