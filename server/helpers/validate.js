class Validate {
	static validateMeetups(req, res, next) {
		const string = req.body.location;
		const top = req.body.topic;
		const reqs = req.body.meetup;
		const img = req.body.images;
		const tag = req.body.tags;

		if (string === "") {
			return res.status(400).json({
				status: 400,
				message: "The location body can not be empty"
			});
		}

		if (!Array.isArray(img)) {
			return res.status(400).json({
				status: 400,
				message: "The images body should be an array"
			});
		}

		if (!Array.isArray(tag)) {
			return res.status(400).json({
				status: 400,
				message: "The tags body should be an array"
			});
		}

		if (top === "") {
			return res.status(400).json({
				status: 400,
				message: "The topic body can not be empty"
			});
		}
		next();
	}

	static validateRespond(req, res, next) {
		const string = req.body.location;
		const top = req.body.topic;
		const tag = req.body.tags;

		if (string === "") {
			return res.status(400).json({
				status: 400,
				message: "The location body can not be empty"
			});
		}

		if (top === "") {
			return res.status(400).json({
				status: 400,
				message: "The topic body can not be empty"
			});
		}

		if (!Array.isArray(tag)) {
			return res.status(400).json({
				status: 400,
				message: "The tags body should be an array"
			});
		}

		next();
	}

	static validateRes(req, res, next) {
		const stat = req.body.response;
		const params = req.body.user_id;
		if (params !== parseInt(params, 10)) {
			return res.status(400).json({
				status: 400,
				message: "The user id should be a number"
			});
		}
		if (stat === "yes" || stat === "no" || stat === "maybe") {
			next();
		} else {
			return res.status(400).json({
				status: 400,
				message: "The status body should be 'yes', 'no' or 'maybe'"
			});
		}
	}

	static validateQuestion(req, res, next) {
		const create = req.body.createdby_id;
		const top = req.body.title;
		const reqs = req.body.meetup_id;
		const bod = req.body.body;
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

		if (vot !== parseInt(vot, 10)) {
			return res.status(400).json({
				status: 400,
				message: "The votes you Entered should be a Number"
			});
		}

		if (top === "") {
			return res.status(400).json({
				status: 400,
				message: "The title body can not be empty"
			});
		}

		if (bod === "") {
			return res.status(400).json({
				status: 400,
				message: "The body can not be empty"
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
}

export default Validate;
