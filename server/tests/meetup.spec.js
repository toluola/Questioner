import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import app from "../index";

chai.use(chaiHttp);

export default function() {
  const login = {
    email: "toluola7@gmail.com",
    password: "test123"
  };

  const meetup = {
    location: "lekki",
    images: ["java.jpg", "jpg.jpg"],
    tags: ["java", "php"],
    happening_on: "22-10-2019",
    topic: "javascript"
  };

  const respondMeetup = {
    meetup_id: 5,
    user_id: 1,
    response: "yes"
  };
  let adminToken;
  before(async () => {
    const response = await chai
      .request(app)
      .post("/api/v1/auth/login")
      .send(login);
    adminToken = response.body.token.createdLogin;
  });

  describe("POST  all meetups", () => {
    it("should return all meetups", async () => {
      const response = await chai
        .request(app)
        .post("/api/v1/meetups")
        .set({ "access-token": adminToken })
        .send(meetup);
      expect(response).to.have.status(201);
      expect(response.body.meetups).to.have.property("location");
      expect(response.body.meetups).to.have.property("images");
      expect(response.body.meetups).to.have.property("happening_on");
      expect(response.body.meetups).to.have.property("topic");
      expect(response.body)
        .to.have.property("message")
        .eql("Meetup created Successfully");
    });
  });

  describe("Get  all meetups", () => {
    it("should return all meetups", async () => {
      const response = await chai
        .request(app)
        .get("/api/v1/meetups")
        .set({ "access-token": adminToken });
      expect(response).to.have.status(200);
      expect(response.body.meetups[0]).to.have.property("location");
      expect(response.body.meetups[0]).to.have.property("happening_on");
      expect(response.body.meetups[0]).to.have.property("topic");
      expect(response.body)
        .to.have.property("message")
        .eql("Meetups Fetched Successfully");
    });
  });
}
