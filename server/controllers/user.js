import jwt from "jsonwebtoken";
import profiles from "../database/dbSetup";
import helpers from "../helpers/helpers";


const { JWT_SECRET } = process.env;

class userController {
    static signup(req, resp, next) {
		req.checkBody("email").isEmail();
		req.checkBody("firstname").isLength({ min: 1 });
		req.checkBody("lastname").isLength({ min: 1 });
		req.checkBody(["password"]).isLength({ min: 5 });
		const errors = req.validationErrors();
		if (errors) {
			return resp.status(422).json({ errors });
		}
		const { firstname, lastname, email, password } = req.body;
		const role = "user";

		const hashPassword = helpers.hashPassword(password);

		profiles.query(
			"INSERT INTO profiles (firstname, lastname, email, role, password )VALUES ($1, $2, $3, $4, $5 ) returning (id, firstname, lastname, email, role)",
			[firstname, lastname, email, role, hashPassword],
			(err, res) => {
				if (err) {
					return resp.status(403).json({
						message: "Registration failed. Try later",
						error: err.message
					});
				}
				resp.status(201).json({
					profile: res.rows[0],
					message: "User created successfully"
				});
			}
		);
	}
}


export default userController;