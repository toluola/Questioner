import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";

chai.use(chaiHttp);

const meet = {
	id: 1,
	createdOn: "12-02-2016",
	location: "the",
	images: ["javascript.png", "program.jpg"],
	topic: "fewfw",
	happeningOn: "30-01-2019",
	tags: ["programmer", "live"],
	isAdmin: true
};

const status = {
	status: "yes",
	createdOn: "12-02-2016",
	location: "lekki",
	topic: "javascript-meetup",
	happeningOn: "30-01-2019",
	tags: ["javascript", "programmer"]
};

const question = {
	id: 1,
	createdOn: "22-10-2015",
	createdBy: 4,
	meetup: 1,
	title: "Enquiry about Time",
	body: "When exactly is the meetup starting. Thanks",
	votes: 0
};

const should = chai.should();
const { expect } = chai;
describe("Server Test", () => {
	it("should test if the server is working", done => {
		chai.request(app)
			.get("/")
			.end((err, res) => {
				expect(res).to.have.status(404);
				expect(res.body).to.be.an("object");
				expect(res.body.error)
					.to.have.property("message")
					.to.eql("Invalid URL");
				done(err);
			});
	});
});

describe("post meetups endpoint", () => {
	it("should post meetups", done => {
		chai.request(app)
			.post("/api/v1/meetups")
			.send(meet)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.createdMeetup.meetup_info).to.have.property(
					"id"
				);
				expect(res.body.createdMeetup.meetup_info).to.have.property(
					"createdOn"
				);
				expect(res.body.createdMeetup.meetup_info).to.have.property(
					"location"
				);
				expect(res.body.createdMeetup.meetup_info).to.have.property(
					"images"
				);
				expect(res.body.createdMeetup.meetup_info).to.have.property(
					"topic"
				);
				expect(res.body.createdMeetup.meetup_info).to.have.property(
					"happeningOn"
				);
				expect(res.body.createdMeetup.meetup_info).to.have.property(
					"tags"
				);
				expect(res.body)
					.to.have.property("message")
					.eql("Meetup added successfully");
				expect(res.body)
					.to.have.property("status")
					.eql(201);
				done(err);
			});
	});
});

describe("Get meetups endpoint", () => {
	it("should fetch all meetups", done => {
		chai.request(app)
			.get("/api/v1/meetups")
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.meetups).to.be.an("array");
				expect(res.body.meetups[0]).to.have.property("id");
				expect(res.body.meetups[0]).to.have.property("createdOn");
				expect(res.body.meetups[0]).to.have.property("location");
				expect(res.body.meetups[0]).to.have.property("images");
				expect(res.body.meetups[0]).to.have.property("topic");
				expect(res.body.meetups[0]).to.have.property("happeningOn");
				expect(res.body.meetups[0]).to.have.property("tags");
				expect(res.body)
					.to.have.property("message")
					.eql("Meetups fetched successfully");
				expect(res.body)
					.to.have.property("status")
					.eql(200);
				done(err);
			});
	});
});

describe("Get a single meetup endpoint", () => {
	it("should fetch a single meetup", done => {
		chai.request(app)
			.get("/api/v1/meetups/1")
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.meetup).to.be.an("object");
				expect(res.body.meetup).to.have.property("id");
				expect(res.body.meetup).to.have.property("createdOn");
				expect(res.body.meetup).to.have.property("location");
				expect(res.body.meetup).to.have.property("images");
				expect(res.body.meetup).to.have.property("topic");
				expect(res.body.meetup).to.have.property("happeningOn");
				expect(res.body.meetup).to.have.property("tags");
				expect(res.body)
					.to.have.property("message")
					.eql("Meetup fetched successfully");
				expect(res.body)
					.to.have.property("status")
					.eql(200);
				done(err);
			});
	});
});

describe("meetups response endpoint", () => {
	it("should post response to meetups", done => {
		chai.request(app)
			.post("/api/v1/meetups/1/rsvps")
			.send(status)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.data.response_details).to.have.property(
					"meetup"
				);
				expect(res.body.data.response_details).to.have.property(
					"topic"
				);
				expect(res.body.data.response_details).to.have.property(
					"topic"
				);
				expect(res.body)
					.to.have.property("message")
					.eql("Your Response has been Recorded");
				expect(res.body)
					.to.have.property("status")
					.eql(201);
				done(err);
			});
	});
});

describe("Get all upcoming meetups endpoint", () => {
	it("should fetch all upcoming meetups", done => {
		chai.request(app)
			.get("/api/v1/meetups/upcomings")
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.upcoming_meetups).to.be.an("array");
				expect(res.body.upcoming_meetups[0]).to.have.property("id");
				expect(res.body.upcoming_meetups[0]).to.have.property(
					"location"
				);
				expect(res.body.upcoming_meetups[0]).to.have.property("status");
				expect(res.body.upcoming_meetups[0]).to.have.property("topic");
				expect(res.body.upcoming_meetups[0]).to.have.property(
					"happeningOn"
				);
				expect(res.body.upcoming_meetups[0]).to.have.property("tags");
				expect(res.body)
					.to.have.property("message")
					.eql("Upcoming Meetups fetched successfully");
				expect(res.body)
					.to.have.property("status")
					.eql(200);
				done(err);
			});
	});
});

describe("post questions endpoint", () => {
	it("should post questions", done => {
		chai.request(app)
			.post("/api/v1/questions")
			.send(question)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.createdQuestion.question_info).to.have.property(
					"createdBy"
				);
				expect(res.body.createdQuestion.question_info).to.have.property(
					"meetup"
				);
				expect(res.body.createdQuestion.question_info).to.have.property(
					"title"
				);
				expect(res.body.createdQuestion.question_info).to.have.property(
					"body"
				);
				expect(res.body)
					.to.have.property("message")
					.eql("Question added successfully");
				expect(res.body)
					.to.have.property("status")
					.eql(201);
				done(err);
			});
	});
});

describe("upvote Question", () => {
	it("should upvote a question", done => {
		chai.request(app)
			.patch("/api/v1/questions/1/upvote")
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.Data.question_info).to.be.an("object");
				expect(res.body.Data.question_info).to.have.property("id");
				expect(res.body.Data.question_info).to.have.property("meetup");
				expect(res.body.Data.question_info).to.have.property("title");
				expect(res.body.Data.question_info).to.have.property("body");
				expect(res.body.Data.question_info).to.have.property("votes");
				expect(res.body)
					.to.have.property("message")
					.eql("Question successfully upvoted");
				expect(res.body)
					.to.have.property("status")
					.eql(201);
				done(err);
			});
	});
});

describe("downvote Question", () => {
	it("should downvote a question", done => {
		chai.request(app)
			.patch("/api/v1/questions/1/downvote")
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body.Data.question_info).to.be.an("object");
				expect(res.body.Data.question_info).to.have.property("id");
				expect(res.body.Data.question_info).to.have.property("meetup");
				expect(res.body.Data.question_info).to.have.property("title");
				expect(res.body.Data.question_info).to.have.property("body");
				expect(res.body.Data.question_info).to.have.property("votes");
				expect(res.body)
					.to.have.property("message")
					.eql("Question successfully downvoted");
				expect(res.body)
					.to.have.property("status")
					.eql(201);
				done(err);
			});
	});
});
