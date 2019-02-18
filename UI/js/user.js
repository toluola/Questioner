const userToken = localStorage.getItem("authToken");
const meetup = document.getElementById("courses-list");
const meetupCard = document.querySelector(".meetup-container");
const copyright = document.querySelector(".copyright");
const singleMeetup = meetupCard.getElementsByClassName("singleMeetup");

function viewMeetups() {
	fetch("https://questioner03.herokuapp.com/api/v1/meetups", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "access-token": userToken
    }
  })
    .then(res => res.json())
    .then(data => {
    	console.log(data);
      let html = "";
      data.meetups.forEach(datas => {
        html += `<div class="row">
            <div class="four columns">
                <div class="card">
                    <img src="img/course1.jpg" class="course-image u-full-width">
                    <div class="info-card">
                        <a href="#" class="singleMeetup" onclick="singleMeetupLink()" dataId="${datas.id}"><h4>${datas.topic}</h4></a>
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
      meetup.style.display = "block";
      meetupCard.innerHTML = html;
      copyright.style.display = "block";
    })
    .catch(error => console.log(error.message));
}

function singleMeetupLink() {
 for (let i = 0; i < singleMeetup.length; i++) {
   singleMeetup[i].addEventListener("click", event => {
    fetch(`https://questioner03.herokuapp.com/api/v1/meetups/${singleMeetup[
          i
        ].getAttribute("dataId")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "access-token": userToken
    }
  })
    .then(res => res.json())
    .then(data => {
         localStorage.setItem("meetup", data.meetup.id);
         window.location = "meetup.html";
        })
    .catch(error => console.log(error.message));
   })
 }
}

window.onload = viewMeetups;