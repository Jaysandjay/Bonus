const form = document.getElementById("form");
const formDiv = document.getElementById("formDiv");
const signIn = document.getElementById("signIn");
const signUp = document.getElementById("signUp");
const userName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loggedInMessage = document.getElementById("login-message");
const spanName = document.getElementById("currentUser");
const logOut = document.getElementById("logout");

function validateLength(input) {
  if (input.trim().length == 0) {
    return false;
  } else {
    return true;
  }
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function getName() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  return user.name;
}

function checkLoggin() {
  if (localStorage.getItem("loggedIn") != "true") {
    loggedInMessage.style.visibility = "hidden";
    formDiv.style.visibility = "visible";
  } else {
    let userName = localStorage.getItem("currentUser");
    spanName.textContent = getName();
    loggedInMessage.style.visibility = "visible";
    formDiv.style.visibility = "hidden";
  }
}

checkLoggin();

logOut.addEventListener("click", function () {
  localStorage.setItem("loggedIn", false);
  localStorage.setItem("currentUser", null);
  checkLoggin();
});

function validate() {
  if (
    validateLength(userName.value) &&
    validateLength(email.value) &&
    validateLength(password.value)
  ) {
    if (validateEmail(email.value)) {
      return true;
    } else {
      alert("please insert valid email");
      return false;
    }
  } else {
    alert("Please fill in all feilds");
    return false;
  }
}

function clearInputs() {
  userName.value = "";
  email.value = "";
  password.value = "";
}

// SIGN IN
function searchUser(info) {
  let users = getUsers();
  console.log("info", info);
  console.log("users", users);
  result = users.filter(
    (user) =>
      user.name == info.name &&
      user.email == info.email &&
      user.password == info.password
  );
  console.log("result", result);
  console.log(!result == "undefined");
  if (result[0]) {
    localStorage.setItem("loggedIn", true);
    localStorage.setItem("currentUser", JSON.stringify(result[0]));
    clearInputs();
    checkLoggin();
    return result;
  } else {
    alert("User not found, please try again");
    return false;
  }
}

signIn.addEventListener("click", function (event) {
  event.preventDefault();
  if (validate()) {
    info = {
      name: userName.value,
      email: email.value,
      password: password.value,
      history: {},
    };
    searchUser(info);
  }
});

function getUsers() {
  if (!localStorage.getItem("users")) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("users"));
  }
}
// console.log("users", JSON.parse(localStorage.getItem("users") ))

function exists(info) {
  let users = getUsers();
  result = users.filter((user) => user.email == info.email);
  if (result[0]) {
    console.log("true");
    return false;
  } else {
    console.log("false");
    return true;
  }
}

// CREATE NEW
signUp.addEventListener("click", function (event) {
  event.preventDefault();
  if (validate()) {
    let users = getUsers();
    newUser = {
      name: userName.value,
      email: email.value,
      password: password.value,
      history: {},
    };
    if (exists(newUser)) {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      localStorage.setItem("loggedIn", true);
      checkLoggin();
    } else {
      alert("Looks like you already have an account with that email!");
    }
  }
});
