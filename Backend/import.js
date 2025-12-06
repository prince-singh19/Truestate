import mongoose from "mongoose";
import fs from "fs";
import csv from "csv-parser";

console.log("Starting import...");

mongoose.connect(process.env.mongo_url)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

const Sales = mongoose.model("Sales", new mongoose.Schema({}, { strict: false }));

const BATCH_SIZE = 1000;
let batch = [];

fs.createReadStream("./utils/sales_data.csv")
  .pipe(csv())
  .on("data", (row) => {
    batch.push(row);

    if (batch.length >= BATCH_SIZE) {
      // insert batch
      Sales.insertMany(batch)
        .catch(err => console.error("Insert Error:", err));

      batch = []; // reset batch
    }
  })
  .on("end", async () => {
    if (batch.length > 0) {
      await Sales.insertMany(batch);
    }

    console.log("CSV imported successfully!");
    mongoose.disconnect();
  })
  .on("error", (err) => {
    console.error("File Error:", err);
  });
