const postButton = document.getElementsByClassName("post");

for (let i = 0; i < postButton.length; i++) {
	postButton[i].addEventListener("click", event => {
	document.querySelector(".modal").style.display = "block";
		document.querySelector(".modal p").innerHTML =
			"Question Added Successfully";	
	})
}

document.querySelector(".close").onclick = function() {
	document.querySelector(".modal").style.display = "none";
};