const express = require('express');
const router = express.Router();
const docsController = require('../controllers/docsController');

/* Docuemnt upload endpoint */
router.post('/', docsController.upload);

module.exports = router;
