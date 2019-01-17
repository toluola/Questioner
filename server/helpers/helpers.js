import bcrypt from "bcrypt";

class helpers {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static isNumber(number) {
    return !isNaN(number);
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

    if (!requestBody.createdby_id) {
      errors.push("The question created_by is missing. Question not created");
    }

    if (!requestBody.meetup_id) {
      errors.push("The question meetup_id is missing. Question not created");
    }

    if (!requestBody.title) {
      errors.push("The question title is missing. Question not created");
    }

    if (!requestBody.body) {
      errors.push("The question body is missing. Question not created");
    }

    if (errors.length > 0) {
      return errors;
    }
    return false;
  }

  static validateResponseRequest(requestBody) {
    const errors = [];

    if (!requestBody.user_id) {
      errors.push("The user id is missing. Response not created");
    }

    if (!requestBody.response) {
      errors.push("The response is missing. Response not created");
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

    if (!requestBody.title) {
      errors.push("The title is missing. Comment not created");
    }

    if (!requestBody.body) {
      errors.push("The body is missing. Comment not created");
    }

    if (!requestBody.comment) {
      errors.push("The comment is missing. Comment not created");
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
}

export default helpers;
