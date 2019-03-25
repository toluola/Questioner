import Meetup from "../models/meetup";

class MeetupController {
  // creating meetup
  static async createMeetup(req, res) {
    Meetup.create({ ...req.body })
      .then(result => {
        res.status(201).json({
          status: 200,
          data: result,
          message: "Meetup Created Succesfully"
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  // Fetching all meetups
  static async viewMeetups(req, res) {
    Meetup.findAll({
      where: {
        status: "active"
      },
      attributes: { exclude: ["status"] }
    })
      .then(result => {
        res.status(200).json({
          status: 200,
          data: result,
          message: "Meetups Fetched Successfully"
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  // Fetching a single Meetup
  static async viewSingleMeetup(req, res) {
    Meetup.findAll({
      where: {
        id: req.params.id,
        status: "active"
      }
    })
      .then(result => {
        res.status(200).json({
          status: 200,
          data: result
        });
      })
      .catch(err => console.log(err));
  }

  // Deleting Meetup
  static async deleteMeetup(req, res) {
    Meetup.update(
      {
        status: "deleted"
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(result => {
        res.status(200).json({
          status: 200,
          message: "Meetup deleted Successfully"
        });
      })
      .catch(err => console.log(err.messgae));
  }
}

export default MeetupController;
