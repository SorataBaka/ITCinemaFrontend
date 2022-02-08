// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const verifyToken = async() => {
  const token = window.sessionStorage.getItem("token");
  if(!token) return
  const response = await fetch("https://itcinemabackend-production.up.railway.app/user/getuser", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).catch(err => {return err})
  const responseJson = await response.json();
  if(responseJson.Data.length === 0) return
  const user = responseJson.Data[0]
  window.sessionStorage.setItem("user", JSON.stringify(user))
  document.querySelector("#Login").style.display = "none"
  document.querySelector("#Logout").style.display = "block"
  document.querySelector("#Logout").addEventListener("click", () => {
    window.sessionStorage.removeItem("token")
    window.location.replace("/")
  })
}
window.onload = verifyToken();