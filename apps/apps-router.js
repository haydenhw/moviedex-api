const express = require('express');
const router = express.Router();

const controller = require('./apps-controller');

router.get('/', controller.getApps);

module.exports = router;
