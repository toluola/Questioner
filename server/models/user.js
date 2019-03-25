import Sequelize from "sequelize";
import sequelize from "../database/dbSetup";

// creating user model
const Profile = sequelize.define(
  "profile",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      },
      unique: true
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: "user"
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    questions: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    comments: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  {
    timestamps: false,
    underscored: true
  }
);

Profile.sync(); 

export default Profile;
