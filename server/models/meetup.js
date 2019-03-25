import Sequelize from "sequelize";
import sequelize from "../database/dbSetup";

// meetup model set up
const meetup = sequelize.define(
  "meetups",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
      unique: true
    },
    location: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    images: {
      type: Sequelize.Sequelize.TEXT,
      allowNull: false
    },
    tags: {
      type: Sequelize.Sequelize.TEXT,
      allowNull: false
    },
    topic: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    happening_on: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    created_on: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW
    },
    status: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "active"
    }
  },
  {
    timestamps: false,
    underscored: true
  }
);

meetup.sync();

export default meetup;
