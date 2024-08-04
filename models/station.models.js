const mongoose = require('mongoose');

const stationModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true
  },
  code: {
    type: String,
    required: [true, "Code is required"],
    unique: true
  },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  },

}, { timestamps: true });

module.exports = mongoose.model('station', stationModel);
