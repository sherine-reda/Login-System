var loginEmailInput = document.getElementById("loginEmail");
var loginPasswordInput = document.getElementById("loginPassword");
var registerNameInput = document.getElementById("registerName");
var registerEmailInput = document.getElementById("registerEmail");
var registerPasswordInput = document.getElementById("registerPassword");
var alertRegister = document.getElementById("alertRegister");
var alertLogin = document.getElementById("alertLogin");
var successRegister = document.getElementById("successRegister");
var userName = document.getElementById("userName")
var usersContainer = [];

if(localStorage.getItem("users") != null){
  var oldUsers = JSON.parse(localStorage.getItem("users"));
  for(var i=0;i<oldUsers.length ; i++)
  usersContainer.push(oldUsers[i])
}

function register() {
  if (
    validateRegisterInputs(registerNameInput) &&
    validateRegisterInputs(registerEmailInput) &&
    validateRegisterInputs(registerPasswordInput) &&
    validateEmailRepeted()
  ) {
    var user = {
      name: registerNameInput.value,
      email: registerEmailInput.value,
      password: registerPasswordInput.value,
    };
    usersContainer.push(user);
    localStorage.setItem("users", JSON.stringify(usersContainer));
    successRegister.classList.replace("d-none", "d-block");
    successRegister.innerHTML = "<span>Success Register </span>";
    clearForm();
  } else {
    successRegister.classList.replace("d-block", "d-none");
    console.log(false);
  }
}
function clearForm() {
  registerNameInput.value = "";
  registerEmailInput.value = "";
  registerPasswordInput.value = "";
}
function login() {
  if (validateLoginInputs(loginEmailInput) && validateLoginInputs(loginPasswordInput)) {
    if (localStorage.getItem("users") != null) {
      var users = JSON.parse(localStorage.getItem("users"));
      for (var i = 0; i < users.length; i++) {
        if (
          loginEmailInput.value == users[i].email &&
          loginPasswordInput.value == users[i].password
         ) {
         
           CurrentUser = users[i].name
           localStorage.setItem("CurrentUser", JSON.stringify(CurrentUser));
           window.location.href = "home.html";
        } else {
          alertLogin.classList.replace("d-none", "d-block");
          alertLogin.innerHTML ="<span>incorrect email or password</span>";
         
        }
      }
    }else{
      alertLogin.classList.replace("d-none", "d-block");
      alertLogin.innerHTML ="<span>incorrect email or password</span>";
    }
  } else {
    console.log(false);
  }
}

if(localStorage.getItem("CurrentUser") != null){
  userName.innerHTML = `Welcome ${JSON.parse(localStorage.getItem("CurrentUser"))}`
}

function logout(){
  window.location.href = "index.html";
  localStorage.removeItem("CurrentUser")
}

function validateRegisterInputs(input) {
  var regx = /.+/;
  if (regx.test(input.value)) {
    alertRegister.classList.replace("d-block", "d-none");
    return true;
  } else {
    alertRegister.classList.replace("d-none", "d-block");
    alertRegister.innerHTML = " <span>All inputs is required</span>";

    return false;
  }
}
function validateLoginInputs(input) {
  var regx = /.+/;
  if (regx.test(input.value)) {
    alertLogin.classList.replace("d-block", "d-none");
    return true;
  } else {
    alertLogin.classList.replace("d-none", "d-block");
    alertLogin.innerHTML = " <span>All inputs is required</span>";

    return false;
  }
}

function validateEmailRepeted() {
  if (localStorage.getItem("users") != null) {
    var users = JSON.parse(localStorage.getItem("users"));
    for (var i = 0; i < users.length; i++) {
      if (registerEmailInput.value == users[i].email) {
        alertRegister.classList.replace("d-none", "d-block");
        alertRegister.innerHTML = " <span>this email already exist</span>";
        result =false
        break;
      } else {
        alertRegister.classList.replace("d-block", "d-none");
        result = true
      }
    }
    return result ;
  }else{
    return true ;
  }
}
