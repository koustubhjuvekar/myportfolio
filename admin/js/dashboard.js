if(sessionStorage.getItem("loggedIn")!="true"){

window.location="login.html";

}

function logout(){

sessionStorage.removeItem("loggedIn");

window.location="login.html";

}