document.querySelector(".view").addEventListener("click", event => {
	document.querySelector("#card").style.display = "none";
	document.querySelector("#courses-list").style.display = "block";
})


document.querySelector(".create").addEventListener("click", event => {
	document.querySelector("#courses-list").style.display = "none";
	document.querySelector("#card").style.display = "block";
})