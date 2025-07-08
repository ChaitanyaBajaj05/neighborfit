const express = require("express");
const router = express.Router();
const Neighborhood = require("../models/Neighborhood");
const EditRequest = require("../models/EditRequest");

// ---------------- Specific Routes First -----------------

// Match Preferences
router.post("/match", async (req, res) => {
  const { safety, affordability, nightlife, schools, parks } = req.body;
  if ([safety, affordability, nightlife, schools, parks].some(v => v === undefined)) {
    return res.status(400).json({ error: "Missing preference fields" });
  }

  try {
    const neighborhoods = await Neighborhood.find();
    const scored = neighborhoods.map(n => {
      let score = 0;
      score += Math.abs(n.safety - safety);
      score += Math.abs(n.affordability - affordability);
      score += Math.abs(n.nightlife - nightlife);
      score += Math.abs((n.schools?.length || 0) - schools);
      score += Math.abs(n.parks - parks);
      return { neighborhood: n, score };
    });
    scored.sort((a, b) => a.score - b.score);
    res.json(scored.slice(0, 3));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to perform matching" });
  }
});

// Submit Edit Request (Users)
router.post("/edit-request", async (req, res) => {
  try {
    const { neighborhoodId, requestedData, requestedBy } = req.body;
    if (!neighborhoodId || !requestedData || !requestedBy) {
      return res.status(400).json({ error: "Missing fields for edit request" });
    }
    await EditRequest.create({ neighborhoodId, requestedData, requestedBy });
    res.json({ message: "Edit request sent for admin approval" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit edit request" });
  }
});

// Get All Edit Requests (Admin Only)
router.get("/edit-requests", async (req, res) => {
  try {
    const requests = await EditRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch edit requests" });
  }
});

// Delete Edit Request (after approve/reject)
router.delete("/edit-requests/:id", async (req, res) => {
  try {
    await EditRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete request" });
  }
});

// Add Neighborhood
router.post("/add", async (req, res) => {
  try {
    const { name, city, description, image, safety, affordability, nightlife, parks, schools, hospitals, markets } = req.body;

    if (!name || !safety || !affordability || !nightlife || !parks) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const exists = await Neighborhood.findOne({ name: name.trim() });
    if (exists) return res.status(409).json({ error: "Neighborhood already exists" });

    const newNeighborhood = new Neighborhood({
      name: name.trim(),
      city,
      description,
      image,
      safety,
      affordability,
      nightlife,
      parks,
      schools,
      hospitals,
      markets
    });

    await newNeighborhood.save();
    res.status(201).json({ message: "Neighborhood added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add neighborhood" });
  }
});

// Get All Neighborhoods
router.get("/", async (req, res) => {
  try {
    const neighborhoods = await Neighborhood.find();
    res.json(neighborhoods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching neighborhoods" });
  }
});

// Get Single Neighborhood (keep last)
router.get("/:id", async (req, res) => {
  try {
    const neighborhood = await Neighborhood.findById(req.params.id);
    if (!neighborhood) return res.status(404).json({ error: "Neighborhood not found" });
    res.json(neighborhood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch neighborhood" });
  }
});

// Update Neighborhood (Admin Only)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Neighborhood.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Neighborhood not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update neighborhood" });
  }
});

// Delete Neighborhood (Admin Only)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Neighborhood.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Neighborhood not found" });
    res.json({ message: "Neighborhood deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete neighborhood" });
  }
});

module.exports = router;
