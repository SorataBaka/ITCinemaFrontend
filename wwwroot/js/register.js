const register = async () => {
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
        document.getElementById("error-message-password").innerHTML = "Password must contains an alphabet, a number and 6 characters or more";
        document.getElementById("error-message-password").className = "alert alert-danger";
    }
    if (!validateCPassword(pass,cpass)) {
        document.getElementById("error-message-cpassword").innerHTML = "Invalid email format!";
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
            document.getElementById("error-message").innerHTML = "Login Failed";
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
    return username.length > 6;
};

const validatePassword = (pass) => {
    return String(pass)
        .toLowerCase()
        .match(
            /^[a-z0-9]+$/i
        ) && pass.length > 6;
};
const validateCPassword = (pass,cpass) => {
    return pass==cpass
};