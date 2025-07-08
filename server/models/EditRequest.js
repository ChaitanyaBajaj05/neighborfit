const mongoose = require("mongoose");

const EditRequestSchema = new mongoose.Schema({
  neighborhoodId: { type: mongoose.Schema.Types.ObjectId, ref: "Neighborhood", required: true },
  requestedData: { type: Object, required: true },
  requestedBy: { type: String, required: true }, // email of requester
  status: { type: String, default: "pending" } // pending / approved / rejected
}, { timestamps: true });

module.exports = mongoose.model("EditRequest", EditRequestSchema);
