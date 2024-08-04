const mongoose = require('mongoose');

const ticketModels = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"]
      },
      train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train',
        required: [true, "Train ID is required"]
      },
      startStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: [true, "Start Station ID is required"]
      },
      endStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: [true, "End Station ID is required"]
      },
      price: {
        type: Number,
        required: [true, "Price is required"]
      },
      date: {
        type: Date,
        default: Date.now
      }
}, { timestamps: true });

module.exports = mongoose.model('ticket', ticketModels);
