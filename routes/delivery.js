const express = require("express");
const router = express.Router();
const Delivery = require("../models/Delivery"); // Import your Mongoose model

// ✅ Add Delivery Details API
router.post("/add", async (req, res) => {
    try {
        const { full_name, address, phone_number } = req.body;
        if (!full_name || !address || !phone_number) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const newDelivery = new Delivery({ full_name, address, phone_number });
        await newDelivery.save();

        res.json({ message: "✅ Delivery Details Saved Successfully!" });
    } catch (err) {
        console.error("❌ Error saving delivery details:", err);
        res.status(500).json({ error: "Internal server error!" });
    }
});

// ✅ Export the router (Fixes "app is not defined" error)
module.exports = router;
