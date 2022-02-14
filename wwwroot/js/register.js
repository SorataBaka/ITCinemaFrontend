const register = async () => {
    const emailMessage = document.querySelector("#error-message-email");
    const usernameMessage = document.querySelector("#error-message-username");
    const passwordMessage = document.querySelector("#error-message-password");
    const cpasswordMessage = document.querySelector("#error-message-cpassword");
    const registerAlert = document.querySelector("#error-message")

    emailMessage.innerHTML = "";
    usernameMessage.innerHTML = "";
    passwordMessage.innerHTML = "";
    cpasswordMessage.innerHTML = "";
    registerAlert.innerHTML = "";


    emailMessage.classList.remove("alert");
    usernameMessage.classList.remove("alert");
    passwordMessage.classList.remove("alert");
    cpasswordMessage.classList.remove("alert");
    registerAlert.classList.remove("alert");


    emailMessage.classList.remove("alert-danger");
    usernameMessage.classList.remove("alert-danger");
    passwordMessage.classList.remove("alert-danger");
    cpasswordMessage.classList.remove("alert-danger");
    registerAlert.classList.remove("alert-danger");



    var email = document.getElementById("InputEmail").value;
    var username = document.getElementById("InputUsername").value;
    var pass = document.getElementById("InputPassword").value;
    var cpass = document.getElementById("InputCPassword").value;

    if (!validateEmail(email)) {
        document.getElementById("error-message-email").innerHTML = "Invalid email format!";
        document.getElementById("error-message-email").className = "alert alert-danger";

    }
    if (!validateUsername(username)) {
        document.getElementById("error-message-username").innerHTML = "Username must have 6 characters or more";
        document.getElementById("error-message-username").className = "alert alert-danger";

    }
    if (!validatePassword(pass)) {
        document.getElementById("error-message-password").innerHTML = "Password must contain an alphabet, a number and is atleast 6 characters long";
        document.getElementById("error-message-password").className = "alert alert-danger";

    }
    if (!validateCPassword(pass,cpass)) {
        document.getElementById("error-message-cpassword").innerHTML = "Password and Confirm Password must be same";
        document.getElementById("error-message-cpassword").className = "alert alert-danger";

    }
    if (validateEmail(email) && validateUsername(username) && validatePassword(pass) && validateCPassword(pass, cpass)) {
        var registerRequest = {
            Email: email,
            Username: username,
            Password: pass,
            Role: 1
        }
        var jsonObject = JSON.stringify(registerRequest);
        const response = await fetch("https://itcinemabackend-production.up.railway.app/user/register", {
            method: "POST",
            body: jsonObject,
            headers: {
                "Content-Type": "application/json"
            }
        });
        const res = await response.json();
        if (res.ResultCode == 200) {
            window.location.replace("/login")
        } else {
            document.getElementById("error-message").innerHTML = "Registration Failed. Please make sure your email has not been taken.";
            document.getElementById("error-message").className = "alert alert-danger";
        }
    }

    
}

const login = () => {
    window.location.replace("/login");
}
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validateUsername = (username) => {
    return username.length >= 6;
};

const validatePassword = (pass) => {
    return String(pass)
        .toLowerCase()
        .match(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
        )
};
const validateCPassword = (pass,cpass) => {
    return pass==cpass
};