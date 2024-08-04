const stationModels = require("../models/station.models");
const ticketingModels = require("../models/ticketing.models");
const trainModels = require("../models/train.models");
const walletModels = require("../models/wallet.models");
const { calculateFare } = require("../services/tickets");
const { handleValidationError } = require("../utils/errorHandler");

const createTicket = async (req, res) => {
  try {
    const { cardType, trainId, startStationId, endStationId } = req.body;
    const { userId } = req.params;

    const train = await trainModels.findById(trainId);
    if (!train) return res.status(400).json({ error: 'Invalid train ID.' });

    const startStation = await stationModels.findById(startStationId);
    const endStation = await stationModels.findById(endStationId);
    if (!startStation || !endStation) {
      return res.status(400).json({ error: 'Invalid station information.' });
    }

    const fare = calculateFare(train, startStationId, endStationId);
    if (!fare) {
      return res.status(400).json({
        error: "Invalid this train stops of station information"
      });
    }

    const wallet = await walletModels.findOne({ user: userId });
    if (!wallet || wallet.balance < fare) {
      return res.status(400).json({ error: 'Insufficient funds.' });
    }

    // Deduct amount from wallet and save transaction
    wallet.balance -= fare;
    wallet.transactions.push({ type: cardType, amount: fare, description: 'Ticket purchase' });
    await wallet.save();
 
    const ticket = new ticketingModels({
      user: userId,
      train: trainId,
      startStation: startStationId,
      endStation: endStationId,
      price: fare,
    });
    await ticket.save();

    res.status(200).json({ ticket, balance: wallet.balance });
  } catch (error) {
    handleValidationError(error, res);
  }
};

const getUserTicket = async (req, res) => {

  try {
    const { userId } = req.params;

    const tickets = await ticketingModels.find({ user: userId })

    if (!tickets) {
      return res.status(404).json({ error: 'User ticket not found.' });
    }

    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  createTicket,
  getUserTicket
};