const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/isLoggedin");
const userModel = require("../model/users");
const productModel = require("../model/products");

// Add item to cart
router.post("/api/cart/add", verifyJWT, async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ error: "Product ID and quantity are required" });
    }

    if (quantity < 1 || quantity > 5) {
        return res.status(400).json({ error: "Quantity must be between 1 and 5" });
    }

    try {
        // 1. Validate product exists
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // 2. Get logged-in user
        const user = await userModel.findById(req.user._id);

        // 3. Check if product already in cart
        const cartItemIndex = user.cart.findIndex(
            (item) => item.product.toString() === productId
        );

        if (cartItemIndex > -1) {
            // Product already in cart → update quantity
            const existingQty = user.cart[cartItemIndex].quantity;
            const newQty = existingQty + quantity;

            if (newQty > 5) {
                return res.status(400).json({ error: "Max 5 units allowed per product" });
            }

            user.cart[cartItemIndex].quantity = newQty;
        } else {
            // Product not in cart → push new item
            user.cart.push({
                product: productId,
                quantity,
            });
        }

        await user.save();

        res.status(200).json({ message: "Product added to cart", cart: user.cart });
    } catch (err) {
        console.error("Add to cart error:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
