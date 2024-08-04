const trainModels = require("../models/train.models");
const { handleValidationError } = require("../utils/errorHandler");

const createTrain = async (req, res) => {
    try {
        const trainData = req.body;

        const train = await trainModels.create(trainData);

        return res.status(201).json({
            train,
            status: "success",
            message: "Train created successfully",
        });
    } catch (error) {
        handleValidationError(error, res);
    }
};

const getTrainById = async (req, res) => {
    try {
        const { id } = req.params;

        const train = await trainModels.findById(id);

        if (!train) {
            return res.status(404).json({
                status: "error",
                message: "Train not found",
            });
        }

        return res.status(200).json({
            train,
            status: "success",
            message: "Train retrieved successfully",
        });
    } catch (error) {
        return res.status(401).json({ status: "error", message: error.massages });
    }
};

const getTrains = async (req, res) => {
    try {

        const train = await trainModels.find({});

        return res.status(200).json({
            train,
            status: "success",
            message: "Trains retrieved successfully",
        });
    } catch (error) {
        return res.status(401).json({ status: "error", message: error.massages });
    }
};

const updateTrain = async (req, res) => {
    try {
        const { trainId } = req.params;
        const updateData = req.body;
        const train = await trainModels.findByIdAndUpdate(trainId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!train) {
            return res.status(404).json({
                status: "error",
                message: "Train not found",
            });
        }

        return res.status(200).json({
            train,
            status: "success",
            message: "Train updated successfully",
        });
    } catch (error) {
        handleValidationError(error, res);
    }
};

const addStop = async (req, res) => {
    try {
        const { trainId } = req.params;
        const stopData = req.body;

        const train = await trainModels.findByIdAndUpdate(
            trainId,
            { $push: { stops: stopData } },
            { new: true, runValidators: true }
        );

        if (!train) {
            return res.status(404).json({
                status: "error",
                message: "Train not found",
            });
        }

        return res.status(200).json({
            train,
            status: "success",
            message: "Stop added successfully",
        });
    } catch (error) {
        handleValidationError(error, res);
    }
};

const updateStop = async (req, res) => {
    try {
        const { trainId, stopId } = req.params;
        const updateData = req.body;

        const train = await trainModels.findById(trainId);

        if (!train) {
            return res.status(404).json({
                status: "error",
                message: "Train not found",
            });
        }

        const stopIndex = train.stops.findIndex(stop => stop._id.toString() === stopId);
        console.log("stopIndex",train)

        if (stopIndex === -1) {
            return res.status(404).json({
                status: "error",
                message: "Stop not found",
            });
        }

        // Update the specific stop
        train.stops[stopIndex] = { ...train.stops[stopIndex]._doc, ...updateData };

        await train.save();

        return res.status(200).json({
            train,
            status: "success",
            message: "Stop updated successfully",
        });
    } catch (error) {
        handleValidationError(error, res);
    }
};

const deleteStop = async (req, res) => {
    try {
        const { trainId, stopId } = req.params;

        const result = await trainModels.findOneAndUpdate(
            { _id: trainId },
            {
                $pull: {
                    stops: { _id: stopId }
                },
            },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({
                status: "error",
                message: "Train or Stop not found, Please Check Train and Stop both _id",
            });
        }

        return res.status(200).json({
            result,
            status: "success",
            message: "Stop deleted successfully",
        });
    } catch (error) {
        return res.status(401).json({ status: "error", message: error.massages });
    }
};


module.exports = {
    createTrain,
    getTrainById,
    getTrains,
    updateTrain,
    updateStop,
    deleteStop,
    addStop,
};
