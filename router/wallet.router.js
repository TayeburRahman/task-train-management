const { addWallet, getUserTransactions } = require("../controllers/wallet.controllers");
const { verifyJWT } = require("../middleware/verify.middleware");
const router = require("express").Router();

router.route("/add/:userId").post(addWallet);
router.route("/get/:userId").get(getUserTransactions);


module.exports = router;