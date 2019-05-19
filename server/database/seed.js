import Profile from "../models/user";
import Meetup from "../models/meetup";

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

Meetup.bulkCreate([{
  images: 'java.jpg',
  location: 'victoria island',
  tags: 'java',
  topic: 'java in nigeria',
  happening_on: '2019-03-04',
  status: 'active',
},
{
  images: 'java.jpg',
  location: 'victoria island',
  tags: 'java',
  topic: 'Python in nigeria',
  happening_on: '2019-03-04',
  status: 'active',
},
{
  images: 'java.jpg',
  location: 'victoria island',
  tags: 'java',
  topic: 'javascript in nigeria',
  happening_on: '2019-03-04',
  status: 'active',
}
])
