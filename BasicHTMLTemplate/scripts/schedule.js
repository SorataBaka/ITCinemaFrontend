var globalMovieID;
const retrieveSchedule = async () => {
  //Remember to remove the movieID in production
  const movieID = window.location.href.split("?movieid=")[1] || "6290555e-24a4-4c15-a121-4d15a5e51701"
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
  if(moviedetail.Data.length === 0) {
    alert("Movie ID not found. Redirecting.")
    return window.location.replace("/movies")
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

  document.querySelector("#Day").value = ("0" + day).slice(-2)
  document.querySelector("#Month").value = ("0" + month).slice(-2)
  document.querySelector("#Year").value = year
}
const reset = () => {
  return window.location.reload()
}

const submit = async() => {
  const token = window.localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmltYXJ5c2lkIjoiMWQ5NzJhOGItNGIyZC00OTVkLWFlODctMGQyYTI4OGMzNDc4Iiwicm9sZSI6IjAiLCJuYmYiOjE2NDQ0Njg1MjksImV4cCI6MTY0NDUxMTcyOSwiaWF0IjoxNjQ0NDY4NTI5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjYxOTU1IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.UcsoVbIqb1PmX6IWgjFjsPko8YsKdyQ28UY6IPLUrNA"
  if(!token) return window.location.replace("/login")
  
  var listOfTheatreTimes = []
  //Process query here
  const ScheduleList = document.getElementsByClassName("Schedule")
  for(const Schedule of ScheduleList){
    const Price = Schedule.querySelector(".Schedule-Form>#Price").value
    if(Price.length === 0 || parseInt(Price) <= 0) return document.querySelector("#TheatreSelectAlert").style.display = "block"
    const TheatreID = Schedule.querySelector(".Schedule-Form>#Theatres").value
    if(TheatreID.length === 0)  return document.querySelector("#TheatreSelectAlert").style.display = "block"
    
    //parse picked time here
    var listOfTime = []
    const listoftimedivs = Schedule.getElementsByClassName("Time-Selection")
    for(const time of listoftimedivs){


      const TimeSelection = time.querySelector(".form-check-input")
      //Check if TimeSelection is checked
      if(TimeSelection.checked){
        const timeString = TimeSelection.id
        listOfTime.push(timeString)
      }
    }
    if(listOfTime.length === 0 ) return document.querySelector("#TimeSelectAlert").style.display = "block"

    //Insert to listOfTheatreTimes
    const newSchedule = {
      Price: parseInt(Price),
      TheaterID: TheatreID,
      PlayingAt: listOfTime
    }
    listOfTheatreTimes.push(newSchedule)
  }

  const requestBody = JSON.stringify({
    MovieID: globalMovieID,
    Playings: listOfTheatreTimes
  })
  console.log(JSON.stringify(requestBody))
  const request = await fetch(`https://api.itcinema.xyz/admin/createschedules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: requestBody
  }).catch(err => {
    console.log(err)
    return alert("Failed to create schedule. Please try again later.")
  })
  const response = await request.json()
  if(response.status == 400){
    alert("Failed to submit schedule. Please try again later.")
    return
  }
  console.log(JSON.stringify(response))
  alert("Successfully added new schedule.")
  return window.location.reload()
}

var index = 0;
const create = async () => {

  const token = window.localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmltYXJ5c2lkIjoiMWQ5NzJhOGItNGIyZC00OTVkLWFlODctMGQyYTI4OGMzNDc4Iiwicm9sZSI6IjAiLCJuYmYiOjE2NDQ0Njg1MjksImV4cCI6MTY0NDUxMTcyOSwiaWF0IjoxNjQ0NDY4NTI5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjYxOTU1IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.UcsoVbIqb1PmX6IWgjFjsPko8YsKdyQ28UY6IPLUrNA"
  if (!token) {
    alert("You are not authorized to use this page.")
    window.location.replace("/")
  }

  //Get the date in the form
  const day = document.querySelector("#Day").value
  const month = document.querySelector("#Month").value
  const year = document.querySelector("#Year").value
  if (day.length === 0 || month.length === 0 || year.length === 0) {
    return document.querySelector("#DateInputAlert").style.display = "block"
  }else{
    document.querySelector("#DateInputAlert").style.display = "none"
  }
  
  document.querySelector("#Day").disabled = true
  document.querySelector("#Month").disabled = true
  document.querySelector("#Year").disabled = true
  //If month or day is 1 digit, convert to 2 digits
  if (day.length === 1) day = "0" + day
  if (month.length === 1) month = "0" + month
  const date = `${year}-${month}-${day}`

  const theatreQuery = await fetch(`https://api.itcinema.xyz/theater/gettheaters?limit=10`, {
    method: "GET",
  })
  const theatreQueryJson = await theatreQuery.json()
  const theatres = theatreQueryJson.Data
  if(theatreQueryJson.ResultCode !== 200){
    return document.querySelector("#TheatreFetchAlert").style.display = "block"
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

  const TimeList = document.createElement("div")
  TimeList.classList.add("Available-Time-List")
  TimeList.innerHTML = "Please select a theatre"

  TheatresList.onchange = async() => {
    //On change, refresh the contents of the theatres
    //Fetch schedules from the api
    //If not permitted, then redirect to login page
    //Fetch here

    //Refresh the contents of TimeList div
    const theatreID = TheatresList.value
    if(theatreID === "" ) {
      return document.querySelector("#TheatreSelectAlert").style.display = "block"
    }else{
      document.querySelector("#TheatreSelectAlert").style.display = "none"
    }
    const TimeFetchBody = JSON.stringify({
      "MovieID": globalMovieID,
      "TheaterID": theatreID,
      "Date": `${date}T09:30:00Z`
    })
    const timeListFetch = await fetch(`https://api.itcinema.xyz/admin/getavailabletime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: TimeFetchBody
    })
    const timeListFetchJson = await timeListFetch.json()
    if(timeListFetchJson.Time === undefined){
      alert("Failed to fetch schedules.")
      return window.location.replace("/movies")
    }
    const schedules = timeListFetchJson.Time
    TimeList.innerHTML = ""
    for(const schedule of schedules){
      const time = document.createElement("div")
      time.classList.add("Time-Selection")
      const input = document.createElement("input")
      input.type = "checkbox"
      input.name = "Time"
      input.id = schedule
      input.classList.add("form-check-input")

      const label = document.createElement("label")
      label.classList.add("form-check-label")
      label.for = schedule
      label.innerHTML = schedule.split("T")[1].slice(0, 5)

      time.appendChild(input)
      time.appendChild(label)

      TimeList.appendChild(time)
    }
  }

  ScheduleForm.appendChild(PriceInput)
  ScheduleForm.appendChild(TheatresList)
  ScheduleForm.appendChild(DeleteButton)
  ScheduleDiv.appendChild(ScheduleForm)
  ScheduleDiv.appendChild(TimeList)

  document.querySelector(".Schedule-Creation-Collumn").appendChild(ScheduleDiv)




}
window.onload = retrieveSchedule