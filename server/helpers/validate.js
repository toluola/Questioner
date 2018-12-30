class Validate {
	static validateMeetups(req, res, next) {
		const number = req.body.id;
		const string = req.body.location;
		const top = req.body.topic;
		const reqs = req.body.meetup;
		const img = req.body.images;
		const tag = req.body.tags;
		if (number !== parseInt(number, 10)) {
			return res.status(400).json({
				status: 400,
				message: "The id you Entered should be a Number"
			});
		}

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
		const stat = req.body.status;
		if(stat === "yes" || stat === "no" || stat === "maybe") {
			next();
		} else {
			return res.status(400).json({
				status: 400,
				message: "The status body should be 'yes', 'no' or 'maybe'"
			});
		}
	}
}

export default Validate;
