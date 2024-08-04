const { createTrain, updateStop, updateTrain, deleteStop, addStop, getTrainById, getTrains } = require("../controllers/train.controllers");
const { verifyJWT } = require("../middleware/verify.middleware");

 
  const router = require("express").Router();
  
  router.route("/add").post(verifyJWT,createTrain); 
  router.route('/find/:id').get(verifyJWT,getTrainById); 
  router.route('/find').get(verifyJWT,getTrains); 
  router.route("/update/:trainId").put(verifyJWT,updateTrain); 
  router.route('/update/stops/:trainId').put(verifyJWT,addStop);   
  router.route("/update/:trainId/stops/:stopId").put(verifyJWT,updateStop); 
  router.route('/delete/:trainId/stops/:stopId').delete(verifyJWT,deleteStop); 
  
  module.exports = router;