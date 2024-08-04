 
const { createTicket, getUserTicket } = require("../controllers/ticket.controllers");
const { verifyJWT } = require("../middleware/verify.middleware");
const router = require("express").Router();

router.route("/create/:userId").post(verifyJWT,createTicket); 
router.route("/find/:userId").get(verifyJWT,getUserTicket); 


module.exports = router;