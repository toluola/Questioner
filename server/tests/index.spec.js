import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import meetup from "./meetup.spec";
import question from "./question.spec";
import user from "./user.spec";

import app from "../index";

chai.use(chaiHttp);
const rootUrl = "/";

describe("Error", () => {
  it(" Invald route should return error", async () => {
    const res = await chai.request(app).get(rootUrl);
    expect(res).to.have.status(404);
    expect(res.body).to.be.an("object");
    expect(res.body.error)
      .to.have.property("message")
      .to.eql("Invalid URL");
  });
});

describe("Welcome", () => {
  it("should welcome to questioner", async () => {
    const res = await chai.request(app).get("/api/v1");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body)
      .to.have.property("message")
      .to.eql("Welcome to questioner base URL");
    expect(res.body)
      .to.have.property("status")
      .to.eql(200);
  });
});

meetup();
question();
user();
