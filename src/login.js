const form = document.getElementById("form")
const submit = document.getElementById("submit")
const userName = document.getElementById("name")
const email = document.getElementById("email")
const password = document.getElementById("password")
const loggedInMessage = document.getElementById("login-message")
const spanName = document.getElementById("currentUser")
const logOut = document.getElementById("logout")

function validateLength(input){
    if(input.trim().length == 0){
        return false
    }else{
        return true
    }
}

function validateEmail(email){
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

function checkLoggin(){
    if(localStorage.getItem("loggedIn") === "false"){
        loggedInMessage.style.visibility = "hidden"
        form.style.visibility = "visible"
    }else{
        let userName = JSON.parse(localStorage.getItem("user")).name
        spanName.textContent = userName
        loggedInMessage.style.visibility = "visible"
        form.style.visibility = "hidden"
    }
}

checkLoggin()
  
 

logOut.addEventListener("click", function(){
    localStorage.setItem("loggedIn", false)
    checkLoggin()
})


submit.addEventListener("click", function(event){
    event.preventDefault()
    if(
        validateLength(userName.value) &&
        validateLength(email.value) &&
        validateLength(password.value)
    ){
        if(validateEmail(email.value)){
            console.log("yasy")
            localStorage.setItem("loggedIn", true)
            let newUser = {
                "name": userName.value,
                "order-history": {}
            }
            localStorage.setItem("user", JSON.stringify(newUser))
            checkLoggin()
        }else{
            alert("please insert valid email")
        }
    }else{
        alert("Please fill in all feilds")
    }
})

