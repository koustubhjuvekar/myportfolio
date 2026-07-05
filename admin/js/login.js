const PASSWORD = "KJ@123";

const pass = document.getElementById("password");

const toggle = document.getElementById("toggle");

toggle.onclick = () => {

if(pass.type==="password"){

pass.type="text";

toggle.classList.remove("fa-eye");

toggle.classList.add("fa-eye-slash");

}

else{

pass.type="password";

toggle.classList.remove("fa-eye-slash");

toggle.classList.add("fa-eye");

}

};

function login(){

const value=pass.value;

if(value===PASSWORD){

sessionStorage.setItem("loggedIn","true");

window.location="dashboard.html";

}

else{

document.getElementById("msg").innerHTML="Wrong Password";

}

}