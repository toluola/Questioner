import Sequelize from "sequelize";
import sequelize from "../database/dbSetup";
import meetup from "./meetup";
import profile from "./user";

// question model set up
const Question = sequelize.define(
  "questions",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    created_on: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW,
      allowNull: false
    },
    upvotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    downvotes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    downvote_profiles: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: []
    },
    upvote_profiles: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: []
    },
    profile_id: {
      type: Sequelize.INTEGER,
      notNull: true
    },
    meetup_id: {
      type: Sequelize.INTEGER,
      notNull: true
    }, 
  },
  {
    timestamps: false,
    underscored: true
  }
);

Question.sync();

export default Question;
