import Comment from "../models/comment";
import Profile from "../models/user";

class CommentsController {
  // Creating a Comment Record
  static async createComment(req, res) {
    try {
      console.log(req.params.id);
      const createComment = await Comment.create({
        body: req.body.body,
        profile_id: req.user.id,
        question_id: req.params.questionId
      });
      const commentRecord = await Profile.findAll({
        where: {
          id: req.user.id
        }
      });

      if (createComment) {
        Profile.update(
          {
            comments: commentRecord[0].comments + 1
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
        data: createComment,
        message: "Comment Created Successfully"
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Viewing all Comment Records
  static async fetchComments(req, res) {
    Comment.findAll({
      where: {
        question_id: req.params.questionId
      }
    })
      .then(result => {
        res.status(200).json({
          status: 200,
          data: result,
          message: "Comment Fetched successfully"
        });
      })
      .catch(err => console.log(err));
  }
}

export default CommentsController;
