import validation from "../helpers/helpers";

class ValidateMeetup {
  static async validateMeetupRequest(req, res, next) {
    const validateBody = await validation.validateMeetupRequest(req.body);
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
 export default ValidateMeetup;