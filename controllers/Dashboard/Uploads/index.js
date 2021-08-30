const express = require('express');
const multer = require('multer');

const actionHandler = require('../../../handlers/actionHandler');

const middlewareHandler = require('../../../handlers/middlewareHandler');

const controller = require('./controller');
const validator = require('./validator');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1000000 // 1 mb
  }
});

router.post(
  '/assets',
  upload.single('file'),
  middlewareHandler(validator.uploadAsset),
  actionHandler(controller.uploadAsset)
);


module.exports = router;
