const email = document.getElementById("email");
const password = document.getElementById("password");
const loginError = document.querySelector(".loginError");
const loginForm = document.getElementById("myForm");

function jwt_decode(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
}

loginForm.addEventListener("submit", event => {
  fetch("https://questioner03.herokuapp.com/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.message !== "User Logged In Successfully") {
        loginError.style.display = "block";
        loginError.innerHTML = data.message;
        setTimeout(() => {
          loginError.style.display = "none";
        }, 3000);
      } else {
        localStorage.setItem("authToken", data.token.createdLogin);
        const decoded = jwt_decode(data.token.createdLogin);
        window.location =
          decoded.profile.role === "admin" ? "admin.html" : "user.html";
      }
    })
    .catch(error => console.log(error.message));
  event.preventDefault();
});
