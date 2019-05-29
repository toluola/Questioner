import Question from "../models/question";
import Profile from "../models/user";

class QuestionControllers {
  // Creating A question
  static async createQuestion(req, res) {
    try {
      const createQuestion = await Question.create({ 
        body: req.body.body,
        profile_id: req.user.id,
        meetup_id: req.params.meetupId
       });
      const questionRecord = await Profile.findAll({
        where: {
          id: req.user.id
        }
      });

      if (createQuestion) {
        Profile.update(
          {
            questions: questionRecord[0].questions + 1
          },
          {
            where: {
              id: req.user.id
            }
          }
        );
      }

      res.status(201).json({
        status: 201,
        data: createQuestion,
        message: "Question Created successfully"
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // // Fetching all Questions
  // static async fetchQuestions(req, res) {
  //   Question.findAll({
  //     attributes: { exclude: ["downvote_profiles", "upvote_profiles"] }
  //   })
  //     .then(result => {
  //       res.status(200).json({
  //         status: 200,
  //         data: result,
  //         message: "Questions Fetched Successfully"
  //       });
  //     })
  //     .catch(err => console.log(err));
  // }


  // fetching Questions of a single meetup
      static async fetchMeetupQuestions(req, res) {
        Question.findAll({
          where: {
            meetup_id: req.params.meetupId
          }
        })
        .then(result => {
          res.status(200).json({
            status: 200,
            data: result,
            message: "Questions fetched successfully"
          })
        }).catch(err => res.status(500).json({
          message: 'something went wrong'
        }))
      }

  // Upvote Question
  static async upvoteQuestion(req, res) {
    try {
      const questions = await Question.findAll({
        where: {
          id: req.params.id
        }
      });

      const checkDownvote = await questions[0].downvote_profiles.some(
        downvote => downvote === req.user.id
      );

      const checkUpvote = await questions[0].upvote_profiles.some(
        upvote => upvote === req.user.id
      );

      if (checkUpvote) {
        return res.status(400).json({
          status: 400,
          message: "You already Voted for this question"
        });
      }

      if (checkDownvote) {
        const index = questions[0].downvote_profiles.indexOf(
          req.user.id
        );
        if (index > -1) {
          questions[0].downvote_profiles.splice(index, 1);

          Question.update(
            {
              downvote_profiles: questions[0].downvote_profiles
            },
            {
              where: {
                id: req.params.id
              }
            }
          );

          Question.update(
            {
              downvotes: questions[0].downvotes - 1
            },
            {
              where: {
                id: req.params.id
              }
            }
          );
        }
      }

      Question.update(
        {
          upvotes: questions[0].upvotes + 1
        },
        {
          where: {
            id: req.params.id
          }
        }
      );

      const profile = questions[0].upvote_profiles;
      profile.push(req.user.id);

      Question.update(
        {
          upvote_profiles: profile
        },
        {
          where: {
            id: req.params.id
          }
        }
      );
      return res.status(200).json({
        status: 200,
        message: "You Successfully Upvoted for this Question"
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Downvote Question
  static async downvoteQuestion(req, res) {
    try {
      const questions = await Question.findAll({
        where: {
          id: req.params.id
        }
      });

      const checkDownvote = await questions[0].downvote_profiles.some(
        downvote => downvote === req.user.id
      );

      const checkUpvote = await questions[0].upvote_profiles.some(
        upvote => upvote === req.user.id
      );

      if (checkDownvote) {
        return res.status(400).json({
          status: 400,
          message: "You already Voted for this question"
        });
      }

      if (checkUpvote) {
        const index = questions[0].upvote_profiles.indexOf(req.user.id);
        if (index > -1) {
          questions[0].upvote_profiles.splice(index, 1);

          Question.update(
            {
              upvote_profiles: questions[0].upvote_profiles
            },
            {
              where: {
                id: req.params.id
              }
            }
          );

          Question.update(
            {
              upvotes: questions[0].upvotes - 1
            },
            {
              where: {
                id: req.params.id
              }
            }
          );
        }
      }

      Question.update(
        {
          downvotes: questions[0].downvotes + 1
        },
        {
          where: {
            id: req.params.id
          }
        }
      );

      const profile = questions[0].downvote_profiles;
      profile.push(req.user.id);

      Question.update(
        {
          downvote_profiles: profile
        },
        {
          where: {
            id: req.params.id
          }
        }
      );

      return res.status(200).json({
        status: 200,
        message: "You Successfully Downvoted for this Question"
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default QuestionControllers;
