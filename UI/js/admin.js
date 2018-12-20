const close = document.getElementsByClassName("close-form");


document.querySelector(".view").addEventListener("click", event => {
	document.querySelector("#card").style.display = "none";
	document.querySelector("#courses-list").style.display = "block";
});

document.querySelector(".create").addEventListener("click", event => {
	document.querySelector("#courses-list").style.display = "none";
	document.querySelector("#card").style.display = "block";
});

	for (let i = 0; i < close.length; i++) {
	close[i].addEventListener("click", event => {
		document.querySelector(".modal").style.display = "block";
		document.querySelector(".modal p").innerHTML =
			"Meetup Deleted Successfully";
	});
}

document.querySelector(".close").onclick = function() {
	document.querySelector(".modal").style.display = "none";
};

document.querySelector(".create-button").onclick = function() {
	document.querySelector(".modal").style.display = "block";
	document.querySelector(".modal p").innerHTML =
			"Meetup Created Successfully";
};


