var globalMovieID;
const retrieveSchedule = async () => {
  //Remember to remove the movieID in production
  const movieID = window.location.href.split("?movieid=")[1] || "8619f29e-2029-4c36-a487-166c31b2aaa7"
  globalMovieID = movieID
  const moviedetailquery = await fetch(`https://api.itcinema.xyz/movie/getmovies?limit=10&movieID=${movieID}`, {
    method: "GET",
  }).catch(err => {
    return alert("Failed to fetch movie query. Please try again later.")
  })


  const moviedetail = await moviedetailquery.json()
  if(moviedetail.ResultCode !== 200){
    alert("Movie ID not found. Redirecting to homepage.")
    return window.location.replace("/")
  }
  const movie = moviedetail.Data[0]

  document.querySelector("#Title").value = movie.MovieTitle
  document.querySelector("#Description").value = movie.MovieDescription
  document.querySelector("#Director").value = movie.MovieDirector
  document.querySelector("#Duration").value = `${movie.MovieDuration} minutes`
  document.querySelector(".Movie-Details-Image").style.backgroundImage = `url(${movie.PosterURL})`

}
const gettoday = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  document.querySelector("#Day").value = ("0"+day).split(-2)
  document.querySelector("#Month").value = ("0"+month).split(-2)
  document.querySelector("#Year").value = year
}
const reset = () => {
  return window.location.reload()
}

const submit = () => {
  const token = window.localStorage.getItem("token")
  if(!token) return window.location.replace("/login")
  
}

var index = 0;
const create = async () => {
  document.querySelector("#Day").disabled = true
  document.querySelector("#Month").disabled = true
  document.querySelector("#Year").disabled = true

  const token = window.localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmltYXJ5c2lkIjoiZGZjOGYxMTMtNjk3MC00Y2M2LWJjMWMtNmQ5Zjc4OTc0ZDIwIiwicm9sZSI6IjAiLCJuYmYiOjE2NDQzOTUzNTMsImV4cCI6MTY0NDQzODU1MywiaWF0IjoxNjQ0Mzk1MzUzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjYxOTU1IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.-k6IQQn_xKuylMZWmC9ra-i93d7_MY0n4Z0WXjygJSI"
  if (!token) {
    alert("You are not authorized to use this page.")
    window.location.replace("/")
  }

  //Get the date in the form
  const day = document.querySelector("#Day").value
  const month = document.querySelector("#Month").value
  const year = document.querySelector("#Year").value
  if (day.length === 0 || month.length === 0 || year.length === 0) {
    return alert("Please fill in the date")
  }
  const date = `${year}-${("0"+month).split(-2)}-${("0"+day).split(-2)}`

  const theatreQuery = await fetch(`https://api.itcinema.xyz/theater/gettheaters?limit=10`, {
    method: "GET",
  })
  const theatreQueryJson = await theatreQuery.json()
  const theatres = theatreQueryJson.Data
  if(theatreQueryJson.ResultCode !== 200){
    return document.querySelector(".Alert").style.display = "block"
  }
  const ScheduleDiv = document.createElement("div")
  ScheduleDiv.classList.add("Schedule")
  ScheduleDiv.id = `Schedule-${index++}`

  const ScheduleForm = document.createElement("div")
  ScheduleForm.classList.add("Schedule-Form")
  
  const PriceInput = document.createElement("input")
  PriceInput.type = "number"
  PriceInput.placeholder = "Price"
  PriceInput.classList.add("form-control")
  PriceInput.classList.add("schedule-control")
  PriceInput.id = "Price"
  PriceInput.placeholder = "Price"
  
  const TheatresList = document.createElement("select")
  TheatresList.name = "Theatres"
  TheatresList.id = "Theatres"
  TheatresList.classList.add("form-control")
  TheatresList.classList.add("schedule-control")


  const PickATheatre = document.createElement("option")
  PickATheatre.value = ""
  PickATheatre.innerHTML = "Pick a theatre"
  TheatresList.appendChild(PickATheatre)

  for(const theatre of theatres){
    const option = document.createElement("option")
    option.value = theatre.TheaterID
    option.innerHTML = theatre.TheaterName
    TheatresList.appendChild(option)
  }

  const DeleteButton = document.createElement("button")
  DeleteButton.classList.add("btn")
  DeleteButton.classList.add("btn-danger")
  DeleteButton.classList.add("delete-button")
  DeleteButton.innerHTML = "Delete"
  DeleteButton.onclick = () => {
    ScheduleDiv.remove()
  }
  TheatresList.onchange = () => {
    console.log(ScheduleDiv.id)
    //On change, refresh the contents of the theatres
    //Fetch schedules from the api
    //If not permitted, then redirect to login page
    


  }
  

  ScheduleForm.appendChild(PriceInput)
  ScheduleForm.appendChild(TheatresList)
  ScheduleForm.appendChild(DeleteButton)
  ScheduleDiv.appendChild(ScheduleForm)

  const TimeList = document.createElement("div")
  TimeList.classList.add("Available-Time-List")
  //Fetch the api for available schedules
  //Then create a div with class Time-Selection
  //Create an input with type checkbox, name Time, id of the time, class form-check-input
  //Create a label with for Time, class form-check-label
  //Set the inner html of label with the parsed time
  //Append the label to the div
  //Append the div to the ScheduleDiv
  






  
  document.querySelector(".Schedule-Creation-Collumn").appendChild(ScheduleDiv)




}
window.onload = retrieveSchedule