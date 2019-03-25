import Profile from "../models/user";

Profile.bulkCreate([
  {
    firstname: "Tolulope",
    lastname: "Olaniyan",
    email: "toluola7@gmail.com",
    role: "admin",
    password: "$2b$05$trEqCsQFMC7N.gVK2yM39eLonMNsei8vdoCBfGGVOtnjWFRmCzvA6"
  },
  {
    firstname: "Tolulope",
    lastname: "Olaniyan",
    email: "toluola8@gmail.com",
    role: "user",
    password: "$2b$05$trEqCsQFMC7N.gVK2yM39eLonMNsei8vdoCBfGGVOtnjWFRmCzvA6"
  }
]);
