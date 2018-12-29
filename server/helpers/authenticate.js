class Authenticate {
	static checkAdmin(req, res, next) {
		if (req.body.isAdmin === true) {
			next();
		} else {
			res.status(401).json({
				status: 401,
				message: "You are not Authorized"
			});
		}
	}
}

export default Authenticate;
