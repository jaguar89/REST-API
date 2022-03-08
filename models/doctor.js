const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Location Schema
const LocationSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});

//create Doctor schema
const DoctorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  location: LocationSchema,
});

//create model
const Doctor = mongoose.model("Doctor", DoctorSchema);

//export our model
module.exports = Doctor;
