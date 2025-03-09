const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    address: { type: String, required: true },
    phone_number: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Delivery", DeliverySchema);
