import helpers from "../helpers/helpers";

class UserController {
  static async signup(req, res) {
    try {
      const result = await helpers.createSignup({
        password: helpers.hashPassword(req.body.password),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
      });
      res.status(201).json({
        status: 201,
        message: "User Created Successfully",
        token: result
      });
    } catch (error) {
      return res.status(401).json({
        Error: error.message,
        status: 401,
        message: "Something Went Wrong"
      });
    }
  }

  static async login(req, res) {
    try {
      const result = await helpers.createLogin(req.body);
      return res.status(200).json({
        status: 200,
        token: result,
        message: "User Logged in Successfully"
      });
    } catch (error) {
      return res.status(401).json({
        error: error.message,
        status: 401,
        message: "Something Went Wrong"
      });
    }
  }
}

export default UserController;
