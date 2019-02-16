const userToken = localStorage.getItem("authToken");
const meetupContainer = document.querySelector(".container");

function singleMeetup() {
  fetch(`https://questioner03.herokuapp.com/api/v1/meetups/${localStorage.getItem("meetup")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "access-token": userToken
    }
  })
   .then(res => res.json())
   .then(data => {
        meetupContainer.innerHTML = `<div class="card">
                    <img src="img/course1.jpg" class="course-image u-full-width">
                    <div class="info-card">
                        <h4>${data.meetup.topic}</h4>
                        <p class="p">${data.meetup.location}</p>
                        <p class="price">${
                          data.meetup.happening_on
                        }  <span class="pull">${data.meetup.tags}</span></p>
                        <a href="adminquestion.html" class="question">View questions</a>
                    </div>
                </div>`
    })
   .catch(error => console.log(error.message));
}

window.onload = singleMeetup;