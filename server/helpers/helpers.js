import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Profile from "../models/user";

class helpers {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static validateMeetupRequest(requestBody) {
    const errors = [];

    if (!requestBody.location) {
      errors.push("location is missing. Meetup not created");
    }

    if (!requestBody.images) {
      errors.push("Images is missing. Meetup not created");
    }

    if (!requestBody.topic) {
      errors.push("Topic is missing. Meetup not created");
    }

    if (!requestBody.happening_on) {
      errors.push("Happening Date is missing. Meetup not created");
    }

    if (!requestBody.tags) {
      errors.push("Tags is missing. Meetup not created");
    }

    if (errors.length > 0) {
      return errors;
    }
    return false;
  }

  static validateQuestionRequest(requestBody) {
    const errors = [];

    if (!requestBody.profile_id) {
      errors.push("The question profile_id is missing. Question not created");
    }

    if (!requestBody.meetup_id) {
      errors.push("The question meetup_id is missing. Question not created");
    }

    if (!requestBody.body) {
      errors.push("The question body is missing. Question not created");
    }

    if (errors.length > 0) {
      return errors;
    }
    return false;
  }

  static validateCommentRequest(requestBody) {
    const errors = [];

    if (!requestBody.question_id) {
      errors.push("The question id is missing. Comment not created");
    }

    if (!requestBody.body) {
      errors.push("The body is missing. Comment not created");
    }

    if (!requestBody.profile_id) {
      errors.push("The profile Id is missing. Comment not created");
    }

    if (errors.length > 0) {
      return errors;
    }
    return false;
  }

  static validateSignup(req, resp, next) {
    req.checkBody("email").isEmail();
    const errors = req.validationErrors();
    if (errors) {
      return resp.status(422).json({
        error: "Invalid Email",
        status: 422
      });
    }
    next();
  }

  static validateLogin(req, resp, next) {
    req.checkBody("email").isEmail();
    const errors = req.validationErrors();
    if (errors) {
      return resp.status(422).json({
        error: "Invalid Email",
        status: 422
      });
    }
    next();
  }

  static async createSignup(requestBody) {
    const create = await Profile.create(requestBody);
    create.password = null;
    const payload = {
      profile: create
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h"
    });
    return token;
  }

  static async createLogin(requestBody) {
    const authQuery = await Profile.findAll({
      where: {
        email: requestBody.email
      }
    });

    if (!authQuery[0]) throw new Error("invalid credentials");
    const isCorrectPassword = await bcrypt.compare(
      requestBody.password,
      authQuery[0].password
    );

    if (isCorrectPassword) {
      authQuery[0].password = null;
      const payload = {
        profile: authQuery
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h"
      });
      return token;
    }
    if (!isCorrectPassword) {
      throw new Error("Please Supply a Valid Password");
    }
  }
}

export default helpers;
