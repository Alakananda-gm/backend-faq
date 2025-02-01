const FAQ = require('../models/FAQ');
const client = require('../cache/redis');

exports.getFAQs = async (req, res) => {
  const lang = req.query.lang || 'en';

  try {
    // Check cache first
    const cachedFAQs = await client.get(`faqs-${lang}`);
    if (cachedFAQs) {
      return res.json(JSON.parse(cachedFAQs));
    }

    // Fetch FAQs from the database
    const faqs = await FAQ.find();
    const translatedFAQs = faqs.map((faq) => faq.getTranslatedFAQ(lang));

    // Cache the result
    await client.set(`faqs-${lang}`, JSON.stringify(translatedFAQs), {
      EX: 3600, // Cache for 1 hour
    });

    res.json(translatedFAQs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};