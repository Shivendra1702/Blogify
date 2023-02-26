const mongoose = require("mongoose");

async function connectDB(url) {
  return await mongoose
    .connect(url)
    .then((res) => {
      console.log("MongoDB Connected !!");
    })
    .catch((err) => {
      console.log("error occured!!");
    });
}

module.exports = {connectDB};
