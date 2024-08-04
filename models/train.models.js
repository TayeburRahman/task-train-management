const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"], 
  },
  code: { 
    type: String, 
    required: [true, "Code is required"], 
    unique: true 
  },
  stops: [
    {
      station: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'station', 
        required: true 
      },
      arrivalTime: { 
        type: Date, 
        required: true 
      },
      departureTime: { 
        type: Date, 
        required: true 
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('train', trainSchema);
