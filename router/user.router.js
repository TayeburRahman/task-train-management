const {
  createUser,
  getUser,
  getAllUser, 
} = require("../controllers/user.controllers");
const { verifyJWT, verifyAdmin } = require("../middleware/verify.middleware");
const router = require("express").Router();

router.route("/signup").post(createUser);
router.route("/login").get(getUser); 
router.route("/getByAllAuthor").get(verifyAdmin,getAllUser); 

module.exports = router;
