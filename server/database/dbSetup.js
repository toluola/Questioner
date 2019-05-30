import Sequelize from "sequelize";

// Establishing connection
const db = new Sequelize('postgres://odknrjkt:kpFZJNJTO7eQlNeCS8RRQrV1F8yKlebp@pellefant.db.elephantsql.com:5432/odknrjkt', {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

export default db;
