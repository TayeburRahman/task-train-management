const { createStation, updateStation, deleteStation, getAllStations } = require("../controllers/station.controllers");
const { verifyJWT } = require("../middleware/verify.middleware");
  const router = require("express").Router();
  
  router.route("/create").post(verifyJWT,createStation); 
  router.route("/find").get(verifyJWT,getAllStations); 
  router.route("/update/:id").put(verifyJWT,updateStation); 
  router.route("/delete/:id").delete(verifyJWT,deleteStation);   
  
  module.exports = router;