import Usermodel from "../models/user";

class UserController {
  static async signup(req, resp) {
    try {
      const { firstname, lastname, email, password } = req.body;
      const newSignup = new Usermodel({ firstname, lastname, email, password });
      const createdSignup = await newSignup.Signup();
      resp.status(201).json({
        status: 201,
        profile: createdSignup,
        message: "User created successfully"
      });
    } catch (error) {
      if (
        error.message ===
        'duplicate key value violates unique constraint "profiles_email_uindex"'
      ) {
        return resp.status(409).json({
          status: "409",
          message: "Email Already exist. Thanks"
        });
      }
      return resp.status(500).json({
        status: 500,
        message: "Registration failed. Try later",
        error: error.message
      });
    }
  }

  static async login(req, resp) {
    try {
      const { email, password } = req.body;
      const newLogin = new Usermodel({ email, password });
      const createdLogin = await newLogin.login();
      return resp.status(201).json({
        status: 201,
        token: { createdLogin },
        message: "User Logged In Successfully"
      });
    } catch (error) {
      return resp.status(403).json({
        status: 403,
        message: "Something Went Wrong. Thanks",
        error: error.message
      });
    }
  }
}

export default UserController;
