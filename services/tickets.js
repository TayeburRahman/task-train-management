const calculateFare = (train, startStationId, endStationId) => {
    const farePerStation = 20;
    const stations = train.stops?.map(stop => stop.station.toString());

    const startIdx = stations.indexOf(startStationId);
    const endIdx = stations.indexOf(endStationId);

    if (startIdx === -1 || endIdx === -1 || startIdx === endIdx) {
        throw new Error('This train does not stop at start or end of the provided stations, please check this train stops "station".');
    }

    const numberOfStations = Math.abs(endIdx - startIdx);
    return numberOfStations * farePerStation;
};

module.exports = {
    calculateFare
};