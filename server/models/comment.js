import Sequelize from "sequelize";
import sequelize from "../database/dbSetup";

// comment model set up
const comment = sequelize.define(
  "comments",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      notNull: true,
      primaryKey: true,
      unique: true
    },
    body: {
      type: Sequelize.TEXT,
      notNull: true
    },
    created_on: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW,
      notNull: true
    },
    profile_id: {
      type: Sequelize.INTEGER,
      notNull: true
    },
    question_id: {
      type: Sequelize.INTEGER,
      notNull: true
    },
  },
  {
    timestamps: true,
    underscored: true
  }
);

comment.sync();

export default comment;