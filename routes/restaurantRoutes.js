const express = require("express");
const axios = require("axios");

const router = express.Router();

// ✅ Route to fetch nearby restaurants within 10 km
router.post("/restaurants", async (req, res) => {
    const { latitude, longitude } = req.body;
    console.log(`Request Received: Latitude=${latitude}, Longitude=${longitude}`);

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and Longitude are required!" });
    }

    try {
        console.log("Fetching nearby restaurants...");
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:10000,${latitude},${longitude})["amenity"="restaurant"];out;`;

        const response = await axios.get(overpassUrl);
        console.log("Overpass API Response:", response.data);

        if (!response.data.elements.length) {
            console.log("No restaurants found.");
            return res.json({ message: "No restaurants found within 10 km!" });
        }

        const restaurants = response.data.elements.map((place) => ({
            name: place.tags.name || "Unnamed Restaurant",
            latitude: place.lat,
            longitude: place.lon,
        }));

        console.log("Restaurants Found:", restaurants);
        res.json({ restaurants });

    } catch (error) {
        console.error("❌ Error fetching restaurants:", error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

module.exports = router;
