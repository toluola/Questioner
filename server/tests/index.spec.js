import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../index";

chai.use(chaiHttp);


const should = chai.should();
const { expect } = chai;
describe('Server Test', () => {
  it('should test if the server is working', (done) => {
    chai.request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(404);
		expect(res.body).to.be.an("object");
		expect(res.body.error)
			.to.have.property("message")
			.to.eql("Invalid URL");
        done(err);
      });
  });
});