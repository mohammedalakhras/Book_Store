const mongoose = require("mongoose");

const connectToDB = async () => {
  await mongoose
    .connect(process.env.MongooDBConnection)
    .then(() => {
      console.log("Connected successfully");
    })
    .catch((e) => {
      console.log("Error:", e);
    });
};

module.exports = { connectToDB };
