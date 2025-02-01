const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const FAQ = require('../models/FAQ');

chai.use(chaiHttp);
const { expect } = chai;

describe('FAQ API', () => {
  beforeEach(async () => {
    await FAQ.deleteMany({});
  });

  it('should fetch FAQs in English', (done) => {
    chai
      .request(server)
      .get('/api/faqs')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});