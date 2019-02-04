const logoutLink = document.querySelector(".logout");

logoutLink.addEventListener("click", event => {
  localStorage.removeItem("authToken");
  window.location = "index.html";
  event.preventDefault();
});
