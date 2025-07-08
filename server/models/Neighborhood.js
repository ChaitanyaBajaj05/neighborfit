const mongoose = require("mongoose");

const NeighborhoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    safety: { type: Number, required: true },
    affordability: { type: Number, required: true },
    nightlife: { type: Number, required: true },
    parks: { type: Number, required: true },
    schools: [{ type: String }],   // array of string
    hospitals: [{ type: String }],
    markets: [{ type: String }]
});

module.exports = mongoose.model("Neighborhood", NeighborhoodSchema);
