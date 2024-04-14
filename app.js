const express = require("express");
const bodyParser = require("body-parser");
const newsRouter = require("./routes/news");
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use(express.json());
app.use(newsRouter);

const PORT = process.env.PORT || 3000;

const dbLink = "mongodb+srv://youssef_hussein:AWDSawds12345@newscluster.lniovc9.mongodb.net/";

// this connect to my database
mongoose.connect(dbLink, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => {
  console.log('connected is complete')
}).catch((error) => {
  console.log(`error ${error}`)
})

// this for luncher the server
app.listen(PORT, '0.0.0.0', () => {
  console.log("server is started on port 3000");
});
