const mongoose = require("mongoose");

const customizationSchema = new mongoose.Schema({
    userId: String,
    color: String,
    backgroundColor: String,
    layout: String,
    headerColor: String,
    sidebarColor: String,
    sidebarSize: String,
    menuType: String,
    headerSumaryColor: String,
    sidebarBackgroundColor: String,
  });
  
  const Customization = mongoose.model("Customization", customizationSchema);

module.exports = Customization;