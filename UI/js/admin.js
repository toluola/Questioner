const userToken = localStorage.getItem("authToken");
const topic = document.getElementById("topic");
const meetupLocation = document.getElementById("location");
const date = document.getElementById("date");
const tags = document.getElementById("tags");
const pic = document.getElementById("pic");
const meetupForm = document.getElementById("meetup-form");
const modalContent = document.getElementById("content");
const createMeetup = document.getElementById("card");
const meetup = document.getElementById("courses-list");
const modal = document.querySelector(".modal");
const viewMeetups = document.querySelector(".view");
const createMeetups = document.querySelector(".create");
const close = document.querySelector(".close");
const meetupCard = document.querySelector(".meetup-container");

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
  fetch("https://questioner03.herokuapp.com/api/v1/meetups", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "access-token": userToken
    }
  })
    .then(res => res.json())
    .then(data => {
      let html = "";
      data.meetups.forEach(datas => {
        html += `<div class="row">
            <div class="four columns">
                <div class="card" dataId="${datas.id}">
                    <img src="img/course1.jpg" class="course-image u-full-width">
                    <div class="info-card">
                    	<span class="close-form">&times;</span>
                        <h4>${datas.topic}</h4>
                        <p>${datas.location}</p>
                        <p class="price">${
                          datas.happening_on
                        }  <span class="u-pull-right ">${datas.tags}</span></p>
                    </div>
                     </div>
                </div> 
            </div>
		`;
      });
      createMeetup.style.display = "none";
      meetup.style.display = "block";
      meetupCard.innerHTML = html;
    });
});

createMeetups.addEventListener("click", event => {
  meetup.style.display = "none";
  createMeetup.style.display = "block";
});

close.addEventListener("click", event => {
  modal.style.display = "none";
  window.location.reload();
});
