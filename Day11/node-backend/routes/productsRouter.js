const express = require("express");
const router = express.Router();
const Product = require("../model/products");
const Category = require("../model/Category");
const verifyJWT = require("../middlewares/isLoggedin");

// Create Product API (Authenticated)
router.post("/api/products", verifyJWT, async (req, res) => {
  try {
    const {
      name,
      price,
      discount,
      image,
      bgColor,
      panelColor,
      textColor,
      categoryId,
      subcategory,
    } = req.body;

    // 1. Validate required fields
    if (!name || !price || !categoryId || !subcategory) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 2. Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // 3. Check if subcategory is valid
    const subExists = category.subcategories.some(
        (sub) => sub.name.toLowerCase() === subcategory.toLowerCase()
    );
    if (!subExists) {
      return res.status(400).json({ error: "Invalid subcategory for this category" });
    }

    // 4. Create product
    const product = new Product({
      name,
      price,
      discount,
      image,
      bgColor,
      panelColor,
      textColor,
      category: category._id,
      subcategory,
    });

    await product.save();

    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    console.error("Create product error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Public API to get all products
router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: "category",
      select: "name" // Only return category name
    });

    res.status(200).json({ products });
  } catch (err) {
    console.error("Fetch products error:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


module.exports = router;
