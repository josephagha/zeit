const mongoose = require("mongoose");
const Subprojects = mongoose.model(
  "Subprojects",
  new mongoose.Schema({
    title: String,
    description: String,
    perantProject: String,
    projectStatus: String,
    requestedBy: String,
    workOnIt: String,
    projectLink: String,
    touchPoint: {},
    workSteps: {},
    note: String,
  })
);
module.exports = Subprojects;

  