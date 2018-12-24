const postButton = document.getElementsByClassName("post");
const responseButton = document.getElementsByClassName("input");
const close = document.getElementsByClassName("close");
const response = document.getElementsByClassName("response");

for (let i = 0; i < postButton.length; i++) {
	postButton[i].addEventListener("click", event => {
	document.querySelector(".modal").style.display = "block";
		document.querySelector(".modal p").innerHTML =
			"Question Added Successfully";	
	})
}

for (let i = 0; i < responseButton.length; i++) {
	responseButton[i].addEventListener("click", event => {
		event.preventDefault();
	document.querySelector(".modal2").style.display = "block";	
	})
}

for (let i = 0; i < response.length; i++) {
	response[i].addEventListener("click", event => {
	document.querySelector(".modal2").style.display = "none";
	document.querySelector(".modal").style.display = "block";
	document.querySelector(".modal p").innerHTML =
			"Your Response has been Recorded";	
	})
}

document.querySelector(".close").onclick = function() {
	document.querySelector(".modal").style.display = "none";
};

document.querySelector(".close2").onclick = function() {
	document.querySelector(".modal2").style.display = "none";
};