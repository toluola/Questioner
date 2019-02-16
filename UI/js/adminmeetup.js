const userToken = localStorage.getItem("authToken");
const meetup = document.getElementById("courses-list");
const meetupCard = document.querySelector(".meetup-container");
const getMeetupCard = meetupCard.getElementsByClassName("card");
const closeForm = meetupCard.getElementsByClassName("close-form");
const deleteModal = document.querySelector(".modal2");
const closeSecond = document.querySelector(".close2");
const createMeetups = document.querySelector(".create");
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
      let html = "";
      data.meetups.forEach(datas => {
        html += `<div class="row">
            <div class="four columns">
                <div class="card">
                    <img src="img/course1.jpg" class="course-image u-full-width">
                    <div class="info-card">
                    	<span class="close-form" onclick="Delete()" dataId="${datas.id}">&times;</span>
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
    })
    .catch(error => console.log(error.message));
}

function Delete() {
   for (let i = 0; i < closeForm.length; i++) {
    closeForm[i].addEventListener("click", event => {
    fetch(`https://questioner03.herokuapp.com/api/v1/meetups/${closeForm[
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
      localStorage.setItem("delete", data.meetup.id);
      deleteModal.style.display = "block";
    })
    .catch(error => console.log(error.message));
   })
 }
}

function noDelete() {
  deleteModal.style.display = "none";
}

function yesDelete() {
  fetch(`https://questioner03.herokuapp.com/api/v1/meetups/${localStorage.getItem("delete")}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "access-token": userToken
    }
  })
   .then(res => res.json())
   .then(data => {
      deleteModal.style.display = "none";
      localStorage.removeItem("delete");
      window.location.reload();
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
         window.location = "singlemeetup.html";
        })
    .catch(error => console.log(error.message));
   })
 }
}

closeSecond.addEventListener("click", event => {
  deleteModal.style.display = "none";
});

createMeetups.addEventListener("click", event => {
  window.location = "admin.html";
});

window.onload = viewMeetups;