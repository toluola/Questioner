import Sequelize from "sequelize";
import sequelize from "../database/dbSetup";
import question from "./question";
import profile from "./user";

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
    }
  },
  {
    timestamps: false,
    underscored: true
  }
);

// Associating comments with profile and meetup
comment.belongsTo(profile);
comment.belongsTo(question);

comment.sync();

export default comment;