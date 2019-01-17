import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import app from "../index";

chai.use(chaiHttp);

export default function() {
  const login = {
    email: "toluola7@gmail.com",
    password: "test123"
  };

  describe("User should login", () => {
    it("should login user", async () => {
      const response = await chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(login);
      expect(response).to.have.status(201);
      expect(response.body.token).to.have.property("createdLogin");
      expect(response.body)
        .to.have.property("message")
        .eql("User Logged In Successfully");
    });
  });
}
