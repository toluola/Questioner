document.querySelector(".login").addEventListener("click", event => {
	event.preventDefault();
	document.getElementById("myForm").style.display = "block";
})

document.querySelector(".create").addEventListener("click", event => {
	event.preventDefault();
	document.getElementById("myFormSign").style.display = "block";
})

document.querySelector(".started").addEventListener("click", event => {
	event.preventDefault();
	document.getElementById("myFormSign").style.display = "block";
})

document.querySelector(".account").addEventListener("click", event => {
	event.preventDefault();
	document.getElementById("myFormSign").style.display = "block";
})

document.querySelector(".comment").addEventListener("click", event => {
	event.preventDefault();
	document.getElementById("myFormSign").style.display = "block";
})

document.querySelector(".ask").addEventListener("click", event => {
	event.preventDefault();
	document.getElementById("myFormSign").style.display = "block";
})

document.querySelector(".upcoming").addEventListener("click", event => {
	event.preventDefault();
	document.getElementById("myFormSign").style.display = "block";
})

function closeForm() {
	document.getElementById("myForm").style.display = "none";
}

function closeFormSign() {
	document.getElementById("myFormSign").style.display = "none";
}