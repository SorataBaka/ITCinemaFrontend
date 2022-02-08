var globalMovieID;
const retrieveSchedule = async() => {
  const movieID = window.location.href.split("?movieid=")[1] || "46ebaff4-cb19-4df9-a75e-02fa2a11c1fb"
  globalMovieID = movieID
  const moviedetailquery = await fetch(`https://api.itcinema.xyz/movie/getmovies?limit=10&movieID=${movieID}`, {
    method: "GET",
  }).catch(err => {return alert("There seems to be a problem fetching the details of the movie. Please try again later.")})


  const moviedetail = await moviedetailquery.json()
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

  document.querySelector("#Day").value = day
  document.querySelector("#Month").value = month
  document.querySelector("#Year").value = year
}
var index = 0;
const create = async() => {
  // const token = window.sessionStorage.getItem("token")
  // if(!token) {
  //   alert("You are not authorized to use this page.")
  //   window.location.replace("/")
  // }
  //Get the date in the form
  const day = document.querySelector("#Day").value
  const month = document.querySelector("#Month").value
  const year = document.querySelector("#Year").value
  console.log(day, month, year)
  if(day.length === 0 || month.length === 0 || year.length === 0){
    return alert("Please fill in the date")
  }
  const date = `${year}-${month}-${day}`
  const theatreQuery = await fetch(`https://api.itcinema.xyz/theater/gettheaters?limit=10`, {
    method: "GET",
  })
  const theatreQueryJson = await theatreQuery.json()
  const theatres = theatreQueryJson.Data
  const TheatresList = document.createElement("select")
  TheatresList.name = "Theatres"
  TheatresList.id = "Theatres"
  TheatresList.classList.add("form-control")
  TheatresList.classList.add("schedule-control")

  for(const theatre of theatres){
    const theatreOption = document.createElement("option")
    theatreOption.value = theatre.TheaterID
    theatreOption.innerText = theatre.TheaterName
    TheatresList.appendChild(theatreOption)
  }
  const PriceInput = document.createElement("input")
  PriceInput.type = "number"
  PriceInput.name = "Price"
  PriceInput.id = "Price"
  PriceInput.classList.add("form-control")
  PriceInput.classList.add("schedule-control")
  PriceInput.placeholder = "Price"

  const DeleteButton = document.createElement("button")
  DeleteButton.classList.add("btn")
  DeleteButton.classList.add("btn-danger")
  DeleteButton.classList.add("delete-button")
  DeleteButton.innerText = "Delete"


  const currentIndex = index++
  DeleteButton.onclick = () => {
    return document.querySelector(`#Schedule-${currentIndex}`).remove()
  }

  const ScheduleFormDiv = document.createElement("div")
  ScheduleFormDiv.classList.add("Schedule-Form")
  ScheduleFormDiv.appendChild(PriceInput)
  ScheduleFormDiv.appendChild(TheatresList)
  ScheduleFormDiv.appendChild(DeleteButton)


  const newschedule = document.createElement("div")
  newschedule.classList.add("Schedule")
  newschedule.id = `Schedule-${currentIndex}`
  newschedule.appendChild(ScheduleFormDiv)

  document.querySelector(".Schedule-Creation-Collumn").appendChild(newschedule)
}
window.onload = retrieveSchedule