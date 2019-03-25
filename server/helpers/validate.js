import Profile from "../models/user";

class Validate {
	static validateQuestion(req, res, next) {
		const create = req.body.profile_id;
		const reqs = req.body.meetup_id;
		const vot = req.body.votes;

		if (create !== parseInt(create, 10)) {
			return res.status(400).json({
				status: 400,
				message: "The createBy id you Entered should be a Number"
			});
		}

		if (reqs !== parseInt(reqs, 10)) {
			return res.status(400).json({
				status: 400,
				message: "The meetup id you Entered should be a Number"
			});
		}
		next();
	}

	static validateUpcomings(res, req, next) {
		if (req.params.upcomings) {
			next();
		} else {
			res.status(400).json({
				status: 400,
				message: "Please specify 'Upcomings' in your Parameters List"
			});
		}
	}

	static validateComment(req, res, next) {
		if (req.body.question_id !== parseInt(req.body.question_id, 10)) {
			return res.status(400).json({
				status: 400,
				message: "The question id you Entered should be a Number"
			});
		}

		if (req.body.title === "") {
			return res.status(400).json({
				status: 400,
				message: "The Title can not be empty"
			});
		}

		if (req.body.body === "") {
			return res.status(400).json({
				status: 400,
				message: "The Body can not be empty"
			});
		}

		if (req.body.comment === "") {
			return res.status(400).json({
				status: 400,
				message: "The comment can not be empty"
			});
		}

		next();
	}

	static validateSignup(req, res, next) {
		req.checkBody("email").isEmail();
		req.checkBody("firstname").isLength({ min: 1 });
		req.checkBody("lastname").isLength({ min: 1 });
		req.checkBody(["password"]).isLength({ min: 5 });
		const errors = req.validationErrors();
		if (errors) {
			return res.status(422).json({ errors: errors[0].msg });
		} 
			next();
	}

	static async CheckMailExist(req, res, next) {
		const mailCheck = await Profile.findAll({
			where: {
				email: req.body.email
			}
		})

		if (mailCheck[0]) {
			return res.status(404).json({
				status: 404,
				message: "Email Already Exist"
			})
		} 
			next();
	}
}

export default Validate;
