const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const Insight = require("./models/insight");

const app = express();

const uri =
  "mongodb+srv://admin:admin@cluster0.ymz4ay7.mongodb.net/?retryWrites=true&w=majority";
const databaseName = "InsightDB";

let database = null;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const connectMongo = async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to the database");
    database = client.db(databaseName);
  } catch (error) {
    console.log("Error in connecting to mongoDB", error);
  }
};

app.get("/", (req, res) => {
  return res.json({
    message: "hello ji",
  });
});

app.get("/getinsight", async (req, res) => {
  try {
    const collection = database.collection("Insight");
    const data = await collection.find({}).toArray();
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log("Error in getting data!");
    return res.status(400).json({
      message: error,
    });
  }
});

app.get("/getDateWiseIntensity", async (req, res) => {
  try {
    const collection = database.collection("Insight");
    const data = await collection.find({}).toArray();

    let unique_data_by_date = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      // const existing_element_index = unique_data_by_date.findIndex(
      //   (val) => val.added === element.added
      // );
      // console.log(data);
      // if (existing_element_index > -1) {
      //   unique_data_by_date[existing_element_index].intensity =
      //     unique_data_by_date[existing_element_index].intensity +
      //     element[index].intensity;
      // } else {
      //   unique_data_by_date.push(element[index]);
      // }

      unique_data_by_date.push(element[index]);

      index = index + 1;
    }

    console.log(unique_data_by_date);
    console.log(data);

    return res.status(200).json({
      data: unique_data_by_date,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
});

app.listen(process.env.PORT || 3010, async () => {
  console.log("Server running on port 3010 (i.e) http://localhost:3010");
  await connectMongo();
  //   await routes(app);
});

module.exports = app;
