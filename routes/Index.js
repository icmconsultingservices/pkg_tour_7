//Index.js

// Set router
const express = require("express");
const router = express.Router();

// GET /
router.get("/", (req, res) => {
    res.render("index.ejs");
});

module.exports = router;
