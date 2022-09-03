const mongoose = require("mongoose");
const Projects = mongoose.model(
  "Projects",
  new mongoose.Schema({
    title: String,
    description: String,
    accomplished: String,
    icon: String,
    pages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subprojects"
    }]
  })
);
module.exports = Projects;

  