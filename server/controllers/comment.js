import Comment from "../models/comment";
import Profile from "../models/user";

class CommentsController {
  // Creating a Comment Record
  static async createComment(req, res) {
    try {
      const createComment = await Comment.create({ ...req.body });
      const commentRecord = await Profile.findAll({
        where: {
          id: req.body.profile_id
        }
      });

      if (createComment) {
        Profile.update(
          {
            comments: commentRecord[0].comments + 1
          },
          {
            where: {
              id: req.body.profile_id
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
    Comment.findAll()
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
