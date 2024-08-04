const stationModels = require("../models/station.models");
const { handleValidationError } = require("../utils/errorHandler");

const createStation = async (req, res) => {
  try {
    const newStation = req.body;

    const station = await stationModels.create(newStation);

    return res.status(200).json({
      station,
      status: "success",
      message: "Station created successfully",
    });
  } catch (error) {
    handleValidationError(error, res);
  }
};

const getAllStations = async (req, res) => {
  try {
    const stations = await stationModels.find({});
    return res.status(200).json({
      status: "success",
      stations,
      message: "Stations retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const updateStation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const station = await stationModels.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!station) {
      return res.status(404).json({
        status: "error",
        message: "Station not found",
      });
    }

    return res.status(200).json({
      station,
      status: "success",
      message: "Station updated successfully",
    });
  } catch (error) {
    handleValidationError(error, res);
  }
};

const deleteStation = async (req, res) => {
  try {
    const { id } = req.params;

    const station = await stationModels.findByIdAndDelete(id);

    if (!station) {
      return res.status(404).json({
        status: "error",
        message: "Station not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Station deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};


module.exports = {
  createStation,
  getAllStations,
  updateStation,
  deleteStation
};