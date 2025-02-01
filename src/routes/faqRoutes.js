const express = require('express');
const faqController = require('../controllers/faqController');

const router = express.Router();

router.get('/faqs', faqController.getFAQs);

module.exports = router;