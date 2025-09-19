const express = require("express");
const { getDashboardData } = require("../controllers/dashboard.js");

const router = express.Router();

router.route('/').get(getDashboardData);

module.exports = router;