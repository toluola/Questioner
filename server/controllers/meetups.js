import _ from "underscore";

const meetups = [];

class meetupsController {
	static saveMeetup(req, res) {
		const meetup = {
				id: req.body.id,
				createdOn: req.body.createdOn,
				location: req.body.location,
				images: req.body.images,
				topic: req.body.topic,
				happeningOn: req.body.happeningOn,
				Tags: req.body.Tags
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
