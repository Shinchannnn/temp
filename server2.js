const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const DataSchema = new mongoose.Schema({
  key: String,
  value: String,
});

const DataModel = mongoose.model("Data", DataSchema);


app.post("/addData", async (req, res) => {
  try {
    const { key, value } = req.body;
    const newData = new DataModel({ key, value });
    await newData.save();
    res.status(201).json({ message: "Data added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding data" });
  }
});

app.get("/getData", async (req, res) => {
  try {
    const data = await DataModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
