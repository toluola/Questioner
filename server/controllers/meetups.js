import _ from "underscore";

const meetups = [];
const upcomings = [];
const newUpcoming = [];

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

	static getEachMeetup(req, res) {
		const id = req.params.Id;
		const data = meetups.filter(user => user.id === id)[0];
		if (data) {
			res.status(200).json({
				message: "Meetup fetched successfully",
				status: 200,
				Meetup: data
			});
		} else {
			res.status(404).json({
				message: "Meetup not found",
				status: 404
			});
		}
	}

	static saveResponse(req, res) {
		const upcoming = {
			response_details: {
				meetup: req.params.id,
				topic: req.body.topic,
				status: req.body.status
			}
		};

		const mainUpcoming = {
			response_details: {
				id: req.params.id,
				topic: req.body.topic,
				status: req.body.status,
				location: req.body.location,
				happeningOn: req.body.happeningOn,
				tags: req.body.tags
			}
		};
		const idSave = req.params.id;
		const newId = upcomings.filter(user => user.meetup === idSave)[0];

		if (newId) {
			res.status(400).json({
				status: 400,
				message: "A response already exist for this meetup"
			});
		} else {
			const added = _.each(upcoming, item => {
				upcomings.push(item);
			});

			const addedUpcoming = _.each(mainUpcoming, item => {
				newUpcoming.push(item);
			});

			res.status(201).json({
				message: "Your Response has been Recorded",
				status: 201,
				data: upcoming
			});
		}
	}

	static getUpcoming(req, res) {
		if (upcomings.length > 0) {
			const upcomingData = newUpcoming.filter(
				user => user.status === "yes"
			);

			console.log(upcomingData);
			res.status(200).json({
				message: "Upcoming Meetups fetched successfully",
				status: 200,
				upcoming_meetups: upcomingData
			});
		} else {
			res.status(404).json({
				message: "No meetup found",
				status: 404
			});
		}
	}
}

export default meetupsController;
