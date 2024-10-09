import mongoose from "mongoose";

const mongoURI =
  "mongodb+srv://LRatau:dbFCNs3pMlzZoK0h@swiggycloneapp.yqcrm.mongodb.net/?retryWrites=true&w=majority&appName=swiggyCloneApp"; // Replace with your MongoDB connection string

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
