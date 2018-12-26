import _ from "underscore";

const meetups = [];

class meetupsController {
	static getMeetups(req, res) {
		if (meetups.length > 0) {
			res.status(200).json({
				message: "Meetups fetched successfully",
				status: 200,
				meetups
			});
		} else {
			res.status(404).json({
				message: "No meetup found",
				status: 404
			});
		}
	}

	static saveMeetup(req, res) {
		const meetup = {
			meetup_info: {
				id: req.body.id,
				createdOn: req.body.createdOn,
				location: req.body.location,
				images: req.body.images,
				topic: req.body.topic,
				happeningOn: req.body.happeningOn,
				Tags: req.body.Tags
			}
		};
		const idSave = req.body.id;
		const newId = meetups.filter(user => user.id === idSave)[0];

		if (newId) {
			res.status(400).json({
				status: 400,
				message: `The Id '${idSave}' you Entered already exist`
			});
		} else {
			const added = _.each(meetup, item => {
				meetups.push(item);
			});
			res.status(201).json({
				message: "Meetup added successfully",
				status: 201,
				createdMeetup: meetup
			});
		}
	}
}

export default meetupsController;
