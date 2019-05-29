import Meetup from "../models/meetup";
import Profile from "../models/user";
import validation from "../helpers/helpers";
import Question from "../models/question";

class CheckQuestions {
  static async checkIds(req, res, next) {
    try {
      // Checking if meetup id exist
      const checkMeetupId = await Meetup.findAll({
        where: {
          id: req.body.meetup_id
        }
      });

      // Checking if profile id exist
      const checkProfileId = await Profile.findAll({
        where: {
          id: req.body.profile_id
        }
      });

      if (!checkMeetupId[0]) {
        return res.status(404).json({
          status: 404,
          message: "The meetup id you entered does not exist"
        });
      }

      if (!checkProfileId[0]) {
        return res.status(404).json({
          status: 404,
          message: "The profile id you entered does not exist"
        });
      }
      next();
    } catch (error) {
      console.log(error.message);
    }
  }

  static async checkQuestionIdExist(req, res, next) {
   const question = await Question.findOne({
      where: {
        id: req.params.id
      }
    })

    const profile = await Profile.findOne({
      where: {
        id: req.user.id
      }
    })

    if(!question){
      return res.status(404).json({
        status: 404,
        message: "The question You are trying to vote does not exist"
      })
    }

    if(!profile){
      return res.status(404).json({
        status: 404,
        message: "The profile id You are trying to vote with does not exist"
      })
    }
    next();
  }

  static async validateQuestions(req, res, next) {
    const validateBody = await validation.validateQuestionRequest(req.body);
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

export default CheckQuestions;
