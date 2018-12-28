import _ from "underscore";

const questions = [];

class questionsController {
	static saveQuestion(req, res) {
		const question = {
			question_info: {
				id: req.body.id,
				createdOn: req.body.createdOn,
				createdBy: req.body.createdBy,
				title: req.body.title,
				meetup: req.body.meetup,
				body: req.body.body,
				votes: req.body.votes
			}
		};

		const questionTwo = {
			question_info: {
				createdBy: req.body.createdBy,
				meetup: req.body.meetup,
				title: req.body.title,
				body: req.body.body
			}
		};

		const idSave = req.body.id;
		const newId = questions.filter(user => user.id === idSave)[0];

		if (newId) {
			res.status(400).json({
				status: 400,
				message: `The Question Id '${idSave}' you Entered already exist`
			});
		} else {
			_.each(question, item => {
				questions.push(item);
			});
			res.status(201).json({
				message: "Question added successfully",
				status: 201,
				createdQuestion: questionTwo
			});
		}
	}

	static questionUpvote(req, res) {
		const idSave = req.params.id;
		const newId = questions.filter(user => user.id === idSave)[0];

		const votes = {
			question_info: {
				id: newId.id,
				meetup: newId.meetup,
				title: newId.title,
				body: newId.body,
				votes: newId.votes + 1
			}
		};

		res.status(201).json({
			message: "Question successfully upvoted",
			status: 201,
			Data: votes
		});
	}
}

export default questionsController;
