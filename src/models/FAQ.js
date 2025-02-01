const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    hi: { question: String, answer: String },
    bn: { question: String, answer: String },
  },
});

// Method to get translated FAQ
faqSchema.methods.getTranslatedFAQ = function (lang) {
  return {
    question: this.translations[lang]?.question || this.question,
    answer: this.translations[lang]?.answer || this.answer,
  };
};

module.exports = mongoose.model('FAQ', faqSchema);