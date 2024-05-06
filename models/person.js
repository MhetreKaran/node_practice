const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  mobile: {
    type: Number,
  },
  city: {
    type: String,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    require: true,
  },
});

// create person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
