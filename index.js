 
const cron = require('node-cron');
const express = require("express");
const cors = require("cors"); 
const connectDB = require("./connection/connectDB");  
require("dotenv").config(); 
const port = process.env.PORT || 5000;
const app = express();

/* Set Middle wares  */
app.use(cors());
app.use(express.json());
 
// database connect
connectDB()

// Task to be scheduled
const updateTrainSchedules = () => {
  console.log("Updating train schedules..."); 
};
cron.schedule('* * * * *', updateTrainSchedules);


/* Use Routes  */
app.use('/api/v1/user', require("./router/user.router"));
app.use('/api/v1/station', require("./router/station.router")); 
app.use('/api/v1/train', require("./router/train.router")); 
app.use('/api/v1/wallet', require("./router/wallet.router")); 
app.use('/api/v1/ticket', require("./router/ticket.router")); 

/* testing api  */
app.get("/", (req, res) => {
  res.send("Server is running");
});

 
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});

module.exports = app;