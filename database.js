const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/dbnotes";

let connected = false;

const connectDB = async () => {
  if (!connected) {
    try {
      await mongoose.connect(url);
      connected = true;
      console.log("MongoDB conectado");
    } catch (error) {
      console.log(error);
    }
  }
};

const disconnectDB = async () => {
  if (connected) {
    try {
      await mongoose.disconnect(url);
      connected = false;
      console.log("MongoDB desconectado");
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = { connectDB, disconnectDB };
