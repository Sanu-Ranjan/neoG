const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  photo: { type: String },
});

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    hostedBy: { type: String, required: true },
    image: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    venue: { type: String },
    address: { type: String },
    price: { type: Number, default: 0 },
    speakers: [speakerSchema],
    description: { type: String },
    dressCode: { type: String },
    ageRestriction: { type: String },
    tags: [{ type: String }],
    eventType: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };
