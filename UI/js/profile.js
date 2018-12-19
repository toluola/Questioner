document.querySelector(".view").addEventListener("click", event => {
	document.querySelector(".contain").style.display = "none";
	document.querySelector("#courses-list").style.display = "block";
})


document.querySelector(".profile").addEventListener("click", event => {
	document.querySelector("#courses-list").style.display = "none";
	document.querySelector(".contain").style.display = "block";
})