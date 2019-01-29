const email = document.getElementById("email");
const password = document.getElementById("password");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const loginError = document.querySelector(".loginError");
const signUpForm = document.getElementById("myFormSign");

function jwt_decode(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
}

signUpForm.addEventListener("submit", event => {
  fetch("https://questioner03.herokuapp.com/api/v1/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      password: password.value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.message !== "User created successfully") {
        loginError.style.display = "block";
        loginError.innerHTML = data.message;
        setTimeout(() => {
          loginError.style.display = "none";
        }, 3000);
      } else {
        localStorage.setItem("authToken", data.data.token);
        const decoded = jwt_decode(data.data.token);
        window.location = "user.html";
      }
    })
    .catch(error => console.log(error.message));
  event.preventDefault();
});
