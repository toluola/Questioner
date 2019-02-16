const userToken = localStorage.getItem("authToken");
const topic = document.getElementById("topic");
const meetupLocation = document.getElementById("location");
const date = document.getElementById("date");
const tags = document.getElementById("tags");
const pic = document.getElementById("pic");
const meetupForm = document.getElementById("meetup-form");
const modalContent = document.getElementById("content");
const createMeetup = document.getElementById("card");
const modal = document.querySelector(".modal");
const viewMeetups = document.querySelector(".view");
const close = document.querySelector(".close");


meetupForm.addEventListener("submit", event => {
  fetch("https://questioner03.herokuapp.com/api/v1/meetups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-token": userToken
    },
    body: JSON.stringify({
      topic: topic.value,
      location: meetupLocation.value,
      happening_on: date.value,
      tags: [tags.value],
      images: [pic.value]
    })
  })
    .then(res => res.json())
    .then(data => {
      modal.style.display = "block";
      modalContent.innerHTML = data.message;
    })
    .catch(error => console.log(error.message));
  event.preventDefault();
});

viewMeetups.addEventListener("click", event => {
  window.location = "adminmeetup.html";
});

close.addEventListener("click", event => {
  modal.style.display = "none";
  window.location.reload();
});
