const express = require('express');

const router = express.Router({});

const actionHandler = require('../../handlers/actionHandler');

router.get('/', actionHandler(async (request) => {
  // optional: add further things to check (e.g. connecting to dababase)
  return {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
}));

module.exports = router;