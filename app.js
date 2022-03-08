const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//create our app
const app = express();

//connect to MongoDB
mongoose.connect(process.env.MONGO_URL).then((res) => {
  console.log("Connected to DB.");
  //start listening on our specific port
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`server is listening on port ${port}...`));
});

//set middleware parser for json
app.use(express.json());

//redirect from localhost
app.get("/", (req, res) => res.redirect("/api/doctors"));

//using our router to handle urls
app.use("/api/doctors", require("./routes/api/doctors"));