import dbConfig from "../database/dbSetup";
import validation from "../helpers/helpers";

class questionsController {
	static getQuestions(req, resp, next) {
		dbConfig.query("SELECT * FROM questions", (err, res) => {
			if (err) {
				return next(err);
			}

			return resp.status(200).json({
				status: 200,
				questions: res.rows,
				message: "Questions Fetched Successfully"
			});
		});
	}

	static createQuestion(req, resp, next) {
		const validateBody = validation.validateQuestionRequest(req.body);
		if (validateBody) {
			return resp.status(400).json({
				message: validateBody,
				status: "Validation error"
			});
		}

		const question = {
			createdby_id: req.body.createdby_id,
			meetup_id: req.body.meetup_id,
			title: req.body.title,
			body: req.body.body,
			votes: req.body.votes
		};

		const { createdby_id, meetup_id, title, body, votes } = question;
		dbConfig.query(
			"INSERT INTO questions (createdby_id, meetup_id, title, body, votes) VALUES ($1,$2,$3,$4,$5) RETURNING *",
			[createdby_id, meetup_id, title, body, votes],
			(err, res) => {
				if (err) {
					return next(err);
				}

				return resp.status(201).json({
					status: 201,
					questions: res.rows[0],
					message: "Question created Successfully"
				});
			}
		);
	}

	static upvoteQuestion(req, resp, next) {
		const question_id = parseInt(req.params.question_id, 10);
		let meetupFound;
		let newVote;

		dbConfig.query(
			"SELECT * FROM questions WHERE id = $1",
			[question_id],
			(err, res) => {
				if (err) {
					return next(err);
				}
				meetupFound = res.rows[0];
				newVote = res.rows[0].votes + 1;

				if (meetupFound) {
					dbConfig.query(
						"UPDATE questions SET (votes) = ($1) WHERE id = $2 RETURNING *",
						[newVote, question_id],
						(errr, ress) => {
							if (errr) {
								return next(errr);
							}

							return resp.status(200).json({
								status: 200,
								MeetupVoted: ress.rows[0],
								message: "Question upvoted Successfully"
							});
						}
					);
				} else {
					resp.status(404).json({
						status: 404,
						message: "No Question Found"
					});
				}
			}
		);
	}

	static downvoteQuestion(req, resp, next) {
		const question_id = parseInt(req.params.question_id, 10);
		let meetupFound;
		let newVote;

		dbConfig.query(
			"SELECT * FROM questions WHERE id = $1",
			[question_id],
			(err, res) => {
				if (err) {
					return next(err);
				}
				meetupFound = res.rows[0];
				newVote = res.rows[0].votes - 1;

				if (meetupFound) {
					dbConfig.query(
						"UPDATE questions SET (votes) = ($1) WHERE id = $2 RETURNING *",
						[newVote, question_id],
						(errr, ress) => {
							if (errr) {
								return next(errr);
							}

							return resp.status(200).json({
								status: 200,
								MeetupVoted: ress.rows[0],
								message: "Question Downvoted Successfully"
							});
						}
					);
				} else {
					resp.status(404).json({
						status: 404,
						message: "No Question Found"
					});
				}
			}
		);
	}

	static createQuestionComment(req, resp, next) {
		const validateBody = validation.validateCommentRequest(req.body);
		if (validateBody) {
			return resp.status(400).json({
				message: validateBody,
				status: "Validation error"
			});
		}

		const comments = {
			question_id: req.body.question_id,
			title: req.body.title,
			body: req.body.body,
			comment: req.body.comment
		};

		const { question_id, title, body, comment } = comments;
		dbConfig.query(
			"INSERT INTO comments (question_id, title, body, comment) VALUES ($1,$2,$3,$4) RETURNING *",
			[question_id, title, body, comment],
			(err, res) => {
				if (err) {
					return next(err);
				}

				return resp.status(201).json({
					status: 201,
					questions: res.rows[0],
					message: "Comment created Successfully"
				});
			}
		);
	}
}

export default questionsController;
