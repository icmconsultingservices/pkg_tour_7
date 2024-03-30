// to use express.Router()
const express = require("express");
const router = express.Router()


//About.js
// Get /about
// Replace 
//   router.get("/about", (reg, res) => {
// for
// router.get("/", (reg, res) => {
// where "/"
// make the route available for /about
router.get("/", (reg, res) => {
    console.log("I am router.get About ...")
    res.render("about.ejs");
});

// Export the module About.js
module.exports = router;
