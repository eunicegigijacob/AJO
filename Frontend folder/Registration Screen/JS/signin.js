function signin(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if(email== "admin@gmail.com" && password=="admin123"){
        window.location.assign("../signup.html");
        alert("Login Successful");
    }
    else{
        alert("Invalid Information");
        return;
    }
}

