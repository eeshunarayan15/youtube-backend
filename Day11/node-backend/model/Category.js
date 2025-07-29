const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
});

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    subcategories: [subCategorySchema],
});

// ✅ Check if model already exists before defining again
module.exports = mongoose.models.Category || mongoose.model("Category", categorySchema);
