const express = require('express');
const { handleExpiredURL } = require('../Scheduler/cleaner');
const router  = express.Router();

router.get("/", handleExpiredURL);

module.exports = router;
