const userModels = require("../models/user.models");
const { generateToken } = require("../utils/token");
let bcrypt = require("bcryptjs");


const createUser = async (req, res) => {
  try {
    const newUser = req.body;

    const ExistingUser = await userModels.findOne({
      email: req.body.email,
    });

    if (ExistingUser) {
      return res.json({
        status: "error",
        message: `${req.body.email} User(email) already exists`,
      });
    }

    const user = await userModels.create(newUser);
    return res.status(200).json({
      user,
      status: "success",
      message: "User register success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error });
  }
};

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password) {
      return res.status(401).json({
        status: "error",
        message: "Email and password are required",
      });
    }

    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }

    const isMatchPassword = await bcrypt.compareSync(password, user.password);
    if (!isMatchPassword) {
      return res.status(401).json({
        status: "error",
        message: "Password not match",
      });
    }

    console.log("isMatchPassword", isMatchPassword);
    if (user.status != "active") {
      return res.status(401).json({
        status: "error",
        message: "User is not active",
      });
    }

    const token = generateToken(user);

    // IGNORE PASSWORD
    const { password: pwd, ...others } = user.toObject();

    return res.status(200).send({
      status: "success",
      user: others,
      token,
      message: "User Login Successful",
    });
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await userModels.find({});

    return res.status(200).send(user);
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages });
  }
};


module.exports = {
  createUser,
  getUser,
  getAllUser,
};
