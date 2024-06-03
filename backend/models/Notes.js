const mongoose = require("mongoose");
const {Schema} = mongoose;


const noteschema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default:"General"
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", noteschema);