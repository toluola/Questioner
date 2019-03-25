import Question from "../models/question";
import Profile from "../models/user";
import helpers from "../helpers/helpers"

class checkComment {
  static async checkQuestionIdExist(req, res, next) {
    try {
      const checkQuestionId = await Question.findAll({
        where: {
          id: req.body.question_id
        }
      });

      const checkProfileId = await Profile.findAll({
        where: {
          id: req.body.profile_id
        }
      });

      if (!checkQuestionId[0]) {
        return res.status(404).json({
          status: 404,
          message: "The Question Id you entered does not exist"
        });
      }
      if (!checkProfileId[0]) {
        return res.status(404).json({
          status: 404,
          message: "The Profile Id you entered does not exist"
        });
      }
      next();
    } catch (error) {
      console.log(error.message);
    }
  }

  static async checkComment(req, res, next) {
      const validateBody = await helpers.validateCommentRequest(req.body);
      if (validateBody) {
        return res.status(400).json({
          message: validateBody,
          status: 400
        });
      }
      if (!validateBody) {
        next();
      }
    }
}
export default checkComment;
