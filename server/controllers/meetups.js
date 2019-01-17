import dbConfig from "../database/dbSetup";
import validation from "../helpers/helpers";

class meetupsController {
  static getMeetups(req, resp, next) {
    dbConfig.query(
      "SELECT * FROM meetups where status = $1",
      ["active"],
      (err, res) => {
        if (err) {
          return next(err);
        }

        return resp.status(200).json({
          status: 200,
          meetups: res.rows,
          message: "Meetups Fetched Successfully"
        });
      }
    );
  }

  static createMeetup(req, resp, next) {
    const validateBody = validation.validateMeetupRequest(req.body);
    if (validateBody) {
      return resp.status(400).json({
        message: validateBody,
        status: "Validation error"
      });
    }

    const meet = {
      location: req.body.location,
      images: req.body.images,
      topic: req.body.topic,
      happening_on: req.body.happening_on,
      tags: req.body.tags
    };

    const { location, images, topic, happening_on, tags } = meet;
    dbConfig.query(
      "INSERT INTO meetups (location, images, topic, happening_on, tags) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [location, images, topic, happening_on, tags],
      (err, res) => {
        if (err) {
          return next(err);
        }

        return resp.status(201).json({
          status: 201,
          meetups: res.rows[0],
          message: "Meetup created Successfully"
        });
      }
    );
  }

  static getEachMeetup(req, resp, next) {
    if (!validation.isNumber(req.params.id)) {
      return resp.status(400).json({
        message: "Please specify a number in the parameters list"
      });
    }

    dbConfig.query(
      "SELECT * FROM meetups WHERE id = $1 AND status = $2",
      [req.params.id, "active"],
      (err, res) => {
        if (err) {
          return next(err);
        }
        if (res.rows.length > 0) {
          return resp.status(200).json({
            meetup: res.rows[0],
            message: "Meetup fetched successfully"
          });
        }

        return resp.status(404).json({ message: "Meetup not found" });
      }
    );
  }

  static createMeetupResponse(req, resp, next) {
    const validateBody = validation.validateResponseRequest(req.body);
    if (validateBody) {
      return resp.status(400).json({
        message: validateBody,
        status: "Validation error"
      });
    }

    if (!validation.isNumber(req.params.meetup_id)) {
      return resp.status(400).json({
        message: "Please specify a number in the parameters list"
      });
    }

    const responses = {
      meetup_id: req.params.meetup_id,
      user_id: req.body.user_id,
      response: req.body.response
    };

    const { meetup_id, user_id, response } = responses;
    dbConfig.query(
      "INSERT INTO upcomings (meetup_id, user_id, response) VALUES ($1,$2,$3) RETURNING *",
      [meetup_id, user_id, response],
      (err, res) => {
        if (err) {
          if (
            err.message ===
            'insert or update on table "upcomings" violates foreign key constraint "upcomings_user_id_fkey"'
          ) {
            return resp.status(409).json({
              status: 409,
              message: "The user id you supplied does not exist. Thanks"
            });
          }
          return next(err);
        }

        return resp.status(201).json({
          status: 201,
          details: res.rows[0],
          message: "Your Responses are Successfully Recorded"
        });
      }
    );
  }

  static getUpcomingMeetups(req, resp, next) {
    dbConfig.query(
      "SELECT * FROM upcomings WHERE response = $1 AND user_id = $2",
      ["yes", req.body.user_id],
      (err, res) => {
        if (err) {
          return next(err);
        }
        if (res.rows.length > 0) {
          return resp.status(200).json({
            upcoming_meetups: res.rows[0],
            message: "Upcoming Meetups fetched successfully"
          });
        }

        return resp
          .status(404)
          .json({ message: "No Upcoming Meetup not found" });
      }
    );
  }

  static deleteMeetup(req, resp, next) {
    if (!validation.isNumber(req.params.id))
      return resp
        .status(400)
        .json({ message: "Please specify a number in the parameters list" });

    const id = parseInt(req.params.id, 10);

    dbConfig.query(
      "UPDATE meetups SET status = $1 WHERE id = $2 RETURNING *",
      ["deleted", id],
      (err, res) => {
        if (err) {
          return next(err);
        }

        if (res && res.rows.length > 0) {
          return resp.status(200).json({
            meetup: res.rows[0],
            message: "Meetup deleted successfully"
          });
        }
        return resp.status(404).json({ message: "Meetup not found" });
      }
    );
  }
}

export default meetupsController;
