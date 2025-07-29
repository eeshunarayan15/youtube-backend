const express = require("express");
const router = express.Router();
const Category = require("../model/Category");
const verifyJWT = require("../middlewares/isLoggedin");

// 1. Create Category — Admin only
router.post("/", verifyJWT, async (req, res) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });

    try {
        const existing = await Category.findOne({ name });
        if (existing) return res.status(400).json({ error: "Category already exists" });

        const newCategory = new Category({ name, subcategories: [] });
        await newCategory.save();
        res.status(201).json({ message: "Category created", category: newCategory });
    } catch (err) {
        res.status(500).json({ error: "Failed to create category" });
    }
});

// 2. Add Subcategory
router.post("/:id/subcategory", verifyJWT, async (req, res) => {
    const { name } = req.body;
    const categoryId = req.params.id;

    if (!name) return res.status(400).json({ error: "Subcategory name is required" });

    try {
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ error: "Category not found" });

        category.subcategories.push({ name });
        await category.save();

        res.status(200).json({ message: "Subcategory added", category });
    } catch (err) {
        res.status(500).json({ error: "Failed to add subcategory" });
    }
});

// 3. Get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

module.exports = router;
