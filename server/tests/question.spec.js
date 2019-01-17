import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import app from "../index";

chai.use(chaiHttp);

export default function() {
  const login = {
    email: "toluola7@gmail.com",
    password: "test123"
  };

  const question = {
    createdby_id: 1,
    meetup_id: 1,
    title: "java",
    body: "jave",
    votes: 1
  };

  let adminToken;
  before(async () => {
    const response = await chai
      .request(app)
      .post("/api/v1/auth/login")
      .send(login);
    adminToken = response.body.token.createdLogin;
  });

  describe("POST  all question", () => {
    it("should return all meetups", async () => {
      const response = await chai
        .request(app)
        .post("/api/v1/questions")
        .set({ "access-token": adminToken })
        .send(question);
      expect(response).to.have.status(201);
      expect(response.body.questions).to.have.property("createdby_id");
      expect(response.body.questions).to.have.property("meetup_id");
      expect(response.body.questions).to.have.property("title");
      expect(response.body.questions).to.have.property("body");
      expect(response.body)
        .to.have.property("message")
        .eql("Question created Successfully");
    });
  });

  describe("Get  all questions", () => {
    it("should return all questions", async () => {
      const response = await chai
        .request(app)
        .get("/api/v1/questions")
        .set({ "access-token": adminToken });
      expect(response).to.have.status(200);
      expect(response.body.questions[0]).to.have.property("createdby_id");
      expect(response.body.questions[0]).to.have.property("meetup_id");
      expect(response.body.questions[0]).to.have.property("title");
      expect(response.body)
        .to.have.property("message")
        .eql("Questions Fetched Successfully");
    });
  });
}
