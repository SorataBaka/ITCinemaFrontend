const login = async () => {
  var email = document.getElementById("InputEmail").value;
  var pass = document.getElementById("InputPassword").value;
  var loginRequest = {
    Email: email,
    Password: pass
  }
  var jsonObject = JSON.stringify(loginRequest);
  const response = await fetch("https://itcinemabackend-production.up.railway.app/user/login", {
    method: "POST",
    body: jsonObject,
    headers: {
      "Content-Type": "application/json"
    }
  });
  const res = await response.json();
  if (res.ResultCode == 200) {
    console.log(JSON.stringify(res));
    window.sessionStorage.setItem("token", res.Data.Token)
  }
}