const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

const PORT = 3100;

mongoose.connect(
  "mongodb+srv://EMS:TnPQ2btlec4ccGQg@cluster0.dz0i96i.mongodb.net/EMS",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log("Error connecting to MongoDB:", error);
});

database.once("open", () => {
  console.log("Database Connected!");
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

indexRouter.initialize(app);

app.listen(PORT, () => console.log(`Server Started at: ${PORT}`));
